﻿function Test()
{
$Data = Invoke-WebRequest -UseBasicParsing -Uri "https://www.blackedraw.com/graphql" -Method "POST" -ContentType "application/json" -Body "{`"operationName`":`"getModels`",`"variables`":{`"site`":`"BLACKEDRAW`",`"first`":18,`"skip`":0,`"filter`":{`"field`":`"sex`",`"op`":`"EQ`",`"value`":`"F`"},`"order`":{`"field`":`"totalRateVal`",`"desc`":true}},`"query`":`"query getModels(`$site: Site!, `$first: Int, `$skip: Int, `$order: ListOrderInput, `$filter: ListFilterInput!) {\n  findModels(\n    input: {site: `$site, first: `$first, skip: `$skip, order: `$order, filter: [`$filter]}\n  ) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      __typename\n    }\n    edges {\n      node {\n        modelId\n        name\n        slug\n        absoluteUrl\n        scenes\n        rating\n        images {\n          listing {\n            ...ImageInfo\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  findFeaturedVideo(input: {site: `$site}) {\n    newId: videoId\n    videoId\n    slug\n    title\n    models {\n      name\n      __typename\n    }\n    images {\n      promo {\n        ...ImageInfo\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  findNextReleaseVideo(input: {site: `$site}) {\n    videoId\n    slug\n    isPreReleasePeriod\n    releaseDate\n    models {\n      name\n      __typename\n    }\n    images {\n      countdown {\n        ...ImageInfo\n        __typename\n      }\n      poster {\n        ...ImageInfo\n        __typename\n      }\n      __typename\n    }\n    previews {\n      countdown {\n        ...PreviewInfo\n        __typename\n      }\n      poster {\n        ...PreviewInfo\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ImageInfo on Image {\n  src\n  placeholder\n  width\n  height\n  highdpi {\n    double\n    triple\n    __typename\n  }\n  __typename\n}\n\nfragment PreviewInfo on Preview {\n  src\n  width\n  height\n  type\n  __typename\n}\n`"}" | ConvertFrom-Json

$Models = $Data.'data'.findModels.edges
$Model = $Models[(Get-Random -Maximum ($Models.Length + 1))].node

$URL = "https://www.blackedraw.com/models/" +$Model.slug

$Data = Invoke-WebRequest $URL
$articleData = $Data.ParsedHtml.getElementsByTagName("article")[0]
$bio = $articleData.getElementsByTagName("p")[0]
$bio.innerText
}


do
{
Test
}while($true)