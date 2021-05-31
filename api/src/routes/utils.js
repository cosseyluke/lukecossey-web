const POST_HTML_ALLOWED_TAGS = ['p', 'br', 'b', 'i', 'em', 'strong', 'a' ]

module.exports.POST_HTML_ALLOWED_TAGS = POST_HTML_ALLOWED_TAGS;

const parseQuerySort = (query, ALLOWED_FIELDS) => {
  const order = query._order == "ASC" ? 1 : -1;
  const sort = {}

  if (ALLOWED_FIELDS.includes(query._sort, 0)) {
    sort[query._sort] = order;
  }

  return sort
};

module.exports.parseQuerySort = parseQuerySort;

const parseQueryFilter = (query, filters) => {
  const result = {}

  for (const [key, value] of Object.entries(filters)) {
    if (key in query) result[value] = query[key];
  }

  return result
};

module.exports.parseQueryFilter = parseQueryFilter;

const slugQuery = function(slug){
    var query = {$or: [{slug: slug}]};
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        query.$or.push({_id: slug});
    }
    return query;
}

module.exports.slugQuery = slugQuery;
