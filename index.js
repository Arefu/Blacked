import fetch from 'node-fetch';
import cheerio from 'cheerio';
async function program () {
    var genderArray = [ 'F', 'M' ];
    var gender = genderArray[Math.floor(Math.random() * 2)];
    var res = await fetch("https://www.blacked.com/graphql", {
        "headers": {
            "content-type": "application/json"
        },
        "body": "{\"operationName\":\"getModels\",\"variables\":{\"site\":\"BLACKED\",\"first\":256,\"skip\":0,\"filter\":{\"field\":\"sex\",\"op\":\"EQ\",\"value\":\"" + gender + "\"},\"order\":{\"field\":\"totalRateVal\",\"desc\":true}},\"query\":\"query getModels($site: Site!, $first: Int, $skip: Int, $order: ListOrderInput, $filter: ListFilterInput!) {\\n  findModels(\\n    input: {site: $site, first: $first, skip: $skip, order: $order, filter: [$filter]}\\n  ) {\\n    totalCount\\n    pageInfo {\\n      hasNextPage\\n      hasPreviousPage\\n      __typename\\n    }\\n    edges {\\n      node {\\n        modelId\\n        name\\n        slug\\n        absoluteUrl\\n        scenes\\n        rating\\n        images {\\n          listing {\\n            ...ImageInfo\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findFeaturedVideo(input: {site: $site}) {\\n    newId: videoId\\n    videoId\\n    slug\\n    title\\n    models {\\n      name\\n      __typename\\n    }\\n    images {\\n      promo {\\n        ...ImageInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  findNextReleaseVideo(input: {site: $site}) {\\n    videoId\\n    slug\\n    isPreReleasePeriod\\n    releaseDate\\n    models {\\n      name\\n      __typename\\n    }\\n    images {\\n      countdown {\\n        ...ImageInfo\\n        __typename\\n      }\\n      poster {\\n        ...ImageInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    previews {\\n      countdown {\\n        ...PreviewInfo\\n        __typename\\n      }\\n      poster {\\n        ...PreviewInfo\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ImageInfo on Image {\\n  src\\n  placeholder\\n  width\\n  height\\n  highdpi {\\n    double\\n    triple\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment PreviewInfo on Preview {\\n  src\\n  width\\n  height\\n  type\\n  __typename\\n}\\n\"}",
        "method": "POST"
    });
    var data = await res.json();

    var modelCount = data.data.findModels.edges.length;
    var modelList = Object.values(data.data.findModels.edges);
    var rand = Math.floor(Math.random() * modelCount);
    var model = modelList[rand].node;
    var url = `https://www.blackedraw.com/models/${model.slug}`;
    var res1 = await fetch(url);
    if (res1.status === 404) {
        url = `https://www.blacked.com/models/${model.slug}`;
        res1 = await fetch(url);
    }
    var html = await res1.text();
    const $ = cheerio.load(html);
    console.log($('p', 'article').text());
}
program();
