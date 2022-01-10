import fetch from 'node-fetch';
import cheerio from 'cheerio';

var modelCount, modelList, modelBio;

async function getModelCount(Gender)
{
    var Request = await fetch("https://www.blacked.com/graphql", {
        "headers": {
            "content-type": "application/json"
        },
        "body": "{\"operationName\":\"getModels\",\"variables\":{\"site\":\"BLACKED\",\"first\":1,\"skip\":0,\"filter\":{\"field\":\"sex\",\"op\":\"EQ\",\"value\":\"" + Gender + "\"},\"order\":{\"field\":\"totalRateVal\",\"desc\":true}},\"query\":\"query getModels($site: Site!, $first: Int, $skip: Int, $order: ListOrderInput, $filter: ListFilterInput!) {\\n  findModels(\\n    input: {site: $site, first: $first, skip: $skip, order: $order, filter: [$filter]}\\n  ) {\\n    totalCount\\n    pageInfo {\\n      hasNextPage\\n      hasPreviousPage\\n      __typename\\n    }\\n    edges {\\n      node {\\n        modelId\\n        name\\n        slug\\n        absoluteUrl\\n        scenes\\n        rating\\n        images {\\n          listing {\\n            ...ImageInfo\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findFeaturedVideo(input: {site: $site}) {\\n    newId: videoId\\n    videoId\\n    slug\\n    title\\n    models {\\n      name\\n      __typename\\n    }\\n    images {\\n      promo {\\n        ...ImageInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findNextReleaseVideo(input: {site: $site}) {\\n    videoId\\n    slug\\n    isPreReleasePeriod\\n    releaseDate\\n    models {\\n      name\\n      __typename\\n    }\\n    images {\\n      countdown {\\n        ...ImageInfo\\n        __typename\\n      }\\n      poster {\\n        ...ImageInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    previews {\\n      countdown {\\n        ...PreviewInfo\\n        __typename\\n      }\\n      poster {\\n        ...PreviewInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ImageInfo on Image {\\n  src\\n  placeholder\\n  width\\n  height\\n  highdpi {\\n    double\\n    triple\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment PreviewInfo on Preview {\\n  src\\n  width\\n  height\\n  type\\n  __typename\\n}\\n\"}",
        "method": "POST"
    });
    var Response = await Request.json();
    modelCount = Response.data.findModels.totalCount;
}

async function getModels(Gender)
{
    var Request = await fetch("https://www.blacked.com/graphql", {
        "headers": {
            "content-type": "application/json"
        },
        "body": "{\"operationName\":\"getModels\",\"variables\":{\"site\":\"BLACKED\",\"first\":200,\"skip\":0,\"filter\":{\"field\":\"sex\",\"op\":\"EQ\",\"value\":\"" + Gender + "\"},\"order\":{\"field\":\"totalRateVal\",\"desc\":true}},\"query\":\"query getModels($site: Site!, $first: Int, $skip: Int, $order: ListOrderInput, $filter: ListFilterInput!) {\\n  findModels(\\n    input: {site: $site, first: $first, skip: $skip, order: $order, filter: [$filter]}\\n  ) {\\n    totalCount\\n    pageInfo {\\n      hasNextPage\\n      hasPreviousPage\\n      __typename\\n    }\\n    edges {\\n      node {\\n        modelId\\n        name\\n        slug\\n        absoluteUrl\\n        scenes\\n        rating\\n        images {\\n          listing {\\n            ...ImageInfo\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findFeaturedVideo(input: {site: $site}) {\\n    newId: videoId\\n    videoId\\n    slug\\n    title\\n    models {\\n      name\\n      __typename\\n    }\\n    images {\\n      promo {\\n        ...ImageInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findNextReleaseVideo(input: {site: $site}) {\\n    videoId\\n    slug\\n    isPreReleasePeriod\\n    releaseDate\\n    models {\\n      name\\n      __typename\\n    }\\n    images {\\n      countdown {\\n        ...ImageInfo\\n        __typename\\n      }\\n      poster {\\n        ...ImageInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    previews {\\n      countdown {\\n        ...PreviewInfo\\n        __typename\\n      }\\n      poster {\\n        ...PreviewInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ImageInfo on Image {\\n  src\\n  placeholder\\n  width\\n  height\\n  highdpi {\\n    double\\n    triple\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment PreviewInfo on Preview {\\n  src\\n  width\\n  height\\n  type\\n  __typename\\n}\\n\"}",
        "method": "POST"
    });
    var Response = await Request.json();
    var totalModels = Response.data.findModels.edges.length;
    //We're assuming that they willl give us <=200 per request, and that the totalModels is the same as we got.
    if(totalModels == modelCount)
        modelList = Response.data.findModels.edges;
    //Otherwise we pick up here and grab another 200, and see if the tempList size is now the same modelCount
    //If they are we return, if not we grab again.
    while(totalModels != modelCount)
    {
        var tempList = Response.data.findModels.edges;
        Request = await fetch("https://www.blacked.com/graphql", {
        "headers": {
            "content-type": "application/json"
        },
        "body": "{\"operationName\":\"getModels\",\"variables\":{\"site\":\"BLACKED\",\"first\":200,\"skip\":200,\"filter\":{\"field\":\"sex\",\"op\":\"EQ\",\"value\":\"" + Gender + "\"},\"order\":{\"field\":\"totalRateVal\",\"desc\":true}},\"query\":\"query getModels($site: Site!, $first: Int, $skip: Int, $order: ListOrderInput, $filter: ListFilterInput!) {\\n  findModels(\\n    input: {site: $site, first: $first, skip: $skip, order: $order, filter: [$filter]}\\n  ) {\\n    totalCount\\n    pageInfo {\\n      hasNextPage\\n      hasPreviousPage\\n      __typename\\n    }\\n    edges {\\n      node {\\n        modelId\\n        name\\n        slug\\n        absoluteUrl\\n        scenes\\n        rating\\n        images {\\n          listing {\\n            ...ImageInfo\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findFeaturedVideo(input: {site: $site}) {\\n    newId: videoId\\n    videoId\\n    slug\\n    title\\n    models {\\n      name\\n      __typename\\n    }\\n    images {\\n      promo {\\n        ...ImageInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findNextReleaseVideo(input: {site: $site}) {\\n    videoId\\n    slug\\n    isPreReleasePeriod\\n    releaseDate\\n    models {\\n      name\\n      __typename\\n    }\\n    images {\\n      countdown {\\n        ...ImageInfo\\n        __typename\\n      }\\n      poster {\\n        ...ImageInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    previews {\\n      countdown {\\n        ...PreviewInfo\\n        __typename\\n      }\\n      poster {\\n        ...PreviewInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ImageInfo on Image {\\n  src\\n  placeholder\\n  width\\n  height\\n  highdpi {\\n    double\\n    triple\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment PreviewInfo on Preview {\\n  src\\n  width\\n  height\\n  type\\n  __typename\\n}\\n\"}",
        "method": "POST"
        });
        Response = await Request.json();
        totalModels = totalModels + Response.data.findModels.edges.length;
        modelList = tempList.concat(Response.data.findModels.edges);
    }
}

async function getRandomModelBio()
{
    var currentModel = modelList[Math.floor(Math.random() * modelCount)].node;
    var Request = await fetch("https://www.blacked.com/graphql", {
    "headers": {
        "content-type": "application/json"},
        "body": "{\"operationName\":\"getModel\",\"variables\":{\"slug\":\"" + currentModel.slug + "\",\"site\":\"BLACKED\",\"first\":15,\"skip\":0},\"query\":\"query getModel($slug: String!, $site: Site!, $first: Int, $skip: Int) {\\n  findOneModel(input: {slug: $slug, site: $site}) {\\n    modelId\\n    name\\n    slug\\n    biography\\n    rating\\n    images {\\n      listing {\\n        ...ImageInfo\\n        __typename\\n      }\\n      poster {\\n        ...ImageInfo\\n        __typename\\n      }\\n      profile {\\n        ...ImageInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    allVideos(input: {site: $site, first: $first, skip: $skip}) {\\n      totalCount\\n      results {\\n        id: uuid\\n        videoId\\n        slug\\n        title\\n        rating\\n        site\\n        absoluteUrl\\n        releaseDate\\n        isExclusive\\n        freeVideo\\n        modelsSlugged: models {\\n          name\\n          absoluteUrl\\n          slugged: slug\\n          __typename\\n        }\\n        images {\\n          listing {\\n            ...ImageInfo\\n            __typename\\n          }\\n          __typename\\n        }\\n        previews {\\n          listing {\\n            ...PreviewInfo\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    latestVideo(input: {site: $site}) {\\n      newId: videoId\\n      videoId\\n      slug\\n      title\\n      models {\\n        name\\n        __typename\\n      }\\n      images {\\n        poster {\\n          ...ImageInfo\\n          __typename\\n        }\\n        __typename\\n      }\\n      previews {\\n        listing {\\n          ...PreviewInfo\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ImageInfo on Image {\\n  src\\n  placeholder\\n  width\\n  height\\n  highdpi {\\n    double\\n    triple\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment PreviewInfo on Preview {\\n  src\\n  width\\n  height\\n  type\\n  __typename\\n}\\n\"}",
        "method": "POST"
    });
    var Response = await Request.json();
    
    if(Response.data.findOneModel.biography == "")
        getRandomModelBio();

    modelBio = Response.data.findOneModel.biography;
}

var Gender = [ 'F', 'M' ][Math.floor(Math.random() * 2)];
await getModelCount(Gender);

await getModels(Gender);

await getRandomModelBio();
console.log(modelBio.replace(/<\/?[^>]+(>|$)/g, ""));