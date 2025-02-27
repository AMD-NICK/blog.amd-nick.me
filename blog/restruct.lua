local function get_all_files(dir)
    local result = {}
    for file in io.popen("find " .. dir .. " -maxdepth 1 -type f "):lines() do
        table.insert(result, file)
    end
    return result
end

local function get_frontmatter(content)
	local frontmatter_end = content:find("---\n", 2, true)
	local frontmatter_match = frontmatter_end and content:sub(5, frontmatter_end - 2)
	return frontmatter_match, (frontmatter_end or 0) + 3
end

local function parse_title(frontmatter_match)
	local title_match = frontmatter_match:match("title: ([^%c]+)")
	return title_match
end

local function parse_slug(frontmatter_match)
	local slug_match = frontmatter_match:match("slug: ([^%c]+)")
	return slug_match
end

local function parse_date(str)
	local date_match = str:match("%d%d%d%d%-%d%d%-%d%d")
	return date_match
end

local function delete_title(frontmatter_match)
	return frontmatter_match:gsub("title: [^%c]+[%c]?", "")
end

local function delete_slug(frontmatter_match)
	return frontmatter_match:gsub("slug: [^%c]+[%c]?", "")
end

local function delete_date(frontmatter_match)
	return frontmatter_match:gsub("date: [^%c]+[%c]?", "")
end

local json_encode = require("cjson").encode
local prettyjson = require("gmod.deps.prettyjson")
local function print_table(any)
	local json = json_encode(any)
	print( prettyjson(json, "\n", "  ", " ") )
end

local function process_file(filepath)
	local content = io.open(filepath, "r"):read("*a")
	local frontmatter_match, frontmatter_end = get_frontmatter(content)

	local date, slug, title
	if frontmatter_match then
		date = parse_date(frontmatter_match)
		slug = parse_slug(frontmatter_match)
		title = parse_title(frontmatter_match)
	else
		date = parse_date(filepath)
		slug = filepath:match("%d%d%d%d%-%d%d%-%d%d%-([^.]+)")
		frontmatter_end = 0
		title = content:match("^# ([^%c]+)")
	end

	assert(date, "Date not found: " .. filepath)
	assert(slug, "Slug not found: " .. filepath)
	assert(title, "Title not found: " .. filepath)

	local new_filepath do
		local year, month, day = date:match("(%d%d%d%d)%-(%d%d)%-(%d%d)")
		new_filepath = "./" .. year .. "/" .. month .. "-" .. day .. "-" .. slug .. ".md"
	end

	local new_frontmatter_match = frontmatter_match and delete_slug(delete_date(delete_title(frontmatter_match))) or ""
	if new_frontmatter_match ~= "" then
		new_frontmatter_match = "---\n" .. new_frontmatter_match .. "\n---\n\n"
	end

	local new_file_content = new_frontmatter_match .. "# " .. title .. "\n" .. content:sub(frontmatter_end + 1)
	-- print(new_file_content)

	-- print_table({date = date, slug = slug, title = title, filepath = {old = filepath, new = new_filepath}})

	-- assert(io.popen([[mkdir -p "$(dirname ]] .. new_filepath .. [[)"]]))
	-- assert(os.rename(filepath, new_filepath))
	-- assert(io.open(new_filepath, "w"):write(new_file_content))

	-- #todo table.concat(redirects, "\n")

end

local files = get_all_files(".")
-- print_table(files)

-- for _, filepath in ipairs(files) do
-- 	-- filepath = "./2016-04-01-prostoy-no-slozniy-parol-lifehack.md"
-- 	-- print("filepath", filepath)

-- 	if filepath:lower():match("%d%d%d%d%-%d%d%-%d%d%-[^.]+%.md$") then
-- 		process_file(filepath)
-- 	else
-- 		print("skipping", filepath)
-- 	end

-- 	-- break
-- end
