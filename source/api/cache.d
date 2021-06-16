module api.cache;

import core.time;

import std.algorithm;
import std.array;
import std.conv;
import std.datetime.systime;
import std.string;

import vibe.core.file;
import vibe.core.log;
import vibe.data.json;
import vibe.http.client;
import vibe.inet.urltransfer;

shared static this()
{
	if (!existsFile("cache"))
		createDirectory("cache");
}

bool isCacheSafeChar(dchar c)
{
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || (c == '_');
}

string[string] headerCacheNames;
static this()
{
	headerCacheNames = [
		"Accept-Language": "_L"
	];
}

string cacheName(string s, string[string] cachableHeaders = null) @trusted
{
	auto extEnd = s.indexOf('?');
	if (extEnd == -1)
		extEnd = s.length;
	auto extStart = s.lastIndexOf('.', extEnd);
	string extension;
	if (extStart != -1 && extEnd - extStart < 10)
		extension = s[extStart .. extEnd];
	if (!extension.length || extension[0] != '.' || !extension[1 .. $].all!isCacheSafeChar)
		extension = null;

	string extra;
	if (cachableHeaders.length)
	{
		auto data = appender!string;
		data ~= "_";
		foreach (key, value; cachableHeaders)
		{
			data ~= "_h";
			if (auto shortened = key in headerCacheNames)
				data ~= *shortened;
			else
				data ~= key;
			data ~= "__";
			data ~= value;
		}
		extra = data.data;
	}

	char[] ret = new char[s.length + extra.length + extension.length];
	ret[0 .. s.length] = s;
	ret[s.length .. s.length + extra.length] = extra;
	ret[s.length + extra.length .. $] = extension;
	foreach (ref c; ret[0 .. s.length + extra.length])
		if (!c.isCacheSafeChar)
			c = '_';
	return cast(string) ret;
}

string proxyImage(string url, Duration lifetime = 3650.days) @safe
{
	url = url.replace("%{resolution}", "640");
	if (url.startsWith("/cache/") && !url.canFind(".."))
		return url;
	else if (url.startsWith("/"))
		url = "https://api.burgerking.de" ~ url;
	return proxyFile(URL(url), lifetime);
}

private string stripPublic(string file) @safe
{
	// keep leading /
	if (file.startsWith("public"))
		return file["public".length .. $];
	else if (file.startsWith("./public"))
		return file["./public".length .. $];
	else
		return file;
}

string proxyFile(URL file, Duration lifetime = 3650.days) @safe
{
	auto dst = NativePath("public/cache") ~ NativePath(cacheName(file.toString));
	if (existsFile(dst) && Clock.currTime - getFileInfo(dst).timeModified < lifetime)
		return dst.toString.stripPublic;
	else
	{
		try
		{
			logInfo("Proxying file %s for %s", file, lifetime);
			download(file, dst);
			return dst.toString.stripPublic;
		}
		catch (Exception e)
		{
			logError("Failed proxying of %s: %s", file, e.msg);
			return file.toString();
		}
	}
}

T requestBK(T)(URL endpoint, Duration lifetime = 1.days, string[string] cachableHeaders = null)
{
	auto filename = NativePath("cache") ~ NativePath(cacheName(endpoint.toString, cachableHeaders));

	try
	{
		if (existsFile(filename) && Clock.currTime - getFileInfo(filename).timeModified < lifetime)
			return parseJsonString(readFileUTF8(filename)).deserializeJson!T;
	}
	catch (Exception e)
	{
		logError("Deleting corrupt cache of %s: %s", endpoint, e);
		removeFile(filename);
	}

	try
	{
		T ret;
		Json json;
		requestHTTP(endpoint, (scope req) {
			foreach (key, value; cachableHeaders)
				req.headers.addField(key, value);
		}, (scope res) {
			if (res.statusCode != 200)
				throw new Exception("Got unexpected status code " ~ res.statusCode.to!string);

			json = res.readJson();
			ret = json.deserializeJson!T;
		});
		try
		{
			writeFileUTF8(filename, json.toString);
		}
		catch (Exception e)
		{
			logError("Failed writing cache for %s: %s", endpoint, e);
		}
		return ret;
	}
	catch (Exception e)
	{
		logError("Failed getting BK %s data: %s", endpoint, e);
		if (existsFile(filename))
			return parseJsonString(readFileUTF8(filename)).deserializeJson!T;
		else
			throw e;
	}
}
