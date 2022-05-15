-- for copas
package.path = package.path ..
	";/Users/amd/.luarocks/share/lua/5.3/?.lua" ..
	";/Users/amd/.luarocks/share/lua/5.3/?/init.lua"

-- luasocket?
package.cpath = package.cpath ..
	";/Users/amd/.luarocks/lib/lua/5.3/?.so"

-- run bot from src
package.path = package.path ..
	";/Users/amd/Documents/GitHub/Kosson-RP/addons/ggram/lua/?.lua" ..
	";/Users/amd/Documents/GitHub/Kosson-RP/addons/ggram/lua/?/init.lua"

-- gmenv via debugger
package.path = package.path ..
	";/Users/amd/Desktop/ggram-bots/?.lua" ..
	";/Users/amd/Desktop/ggram-bots/?/init.lua"



require("ggram.core")
require("gmenv")

local f = io.popen("ls")
local str = f:read("*a")
f:close()

for line in str:gmatch("[^\r\n]+") do
	if line:match("^[^%.].*%.md$") then
		local slug = line:match("^%d%d%d%d%-%d%d%-%d%d%-(.*)%.md$")
		assert(slug, "no slug for " .. line)

		local f = io.open(line, "r")
		local file_content = f:read("*a")
		f:close()

		local lines = string.Split(file_content, "\n")
		assert(lines[3]:find("date"), "no date in " .. line)

		local date = lines[3]:match("date: (.*)")
		local YYYY, MM, DD, HH, mm = date:match("(%d%d%d%d)-(%d%d)-(%d%d) (%d%d):(%d%d)")
		local timestamp = os.time({year = YYYY, month = MM, day = DD, hour = HH, min = mm})
		-- print( lines[3] )
		local datetime = os.date("%Y-%m-%d %H:%M:%S", timestamp + 60 * 60 * 3)
		-- print( "date: '" .. datetime .. "'" )

		lines[3] = "date: '" .. datetime .. "'"

		local new_content = table.concat(lines, "\n")
		io.open(line, "w"):write(new_content)

		-- break

		-- if not file_content:find("slug") then
		-- 	local lines = string.Split(file_content, "\n")
		-- 	if lines[2] == "layout: post" then table.remove(lines, 2) end
		-- 	table.insert(lines, 4, "slug: " .. slug)

		-- 	local new_content = table.concat(lines, "\n")
		-- 	io.open(line, "w"):write(new_content)
		-- end
		-- file_content
	end
end

-- PRINT(io)
