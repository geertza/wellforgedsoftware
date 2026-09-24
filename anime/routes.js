const API = "https://graphql.anilist.co";

async function request(query, variables={}){

  const res = await fetch(API,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({query,variables})
  });

  const json = await res.json();
  return json.data;
}

export async function getTopAnime(format="TV",limit=10){

  const query = `
  query($format:MediaFormat,$perPage:Int){
    Page(perPage:$perPage){
      media(type:ANIME, format:$format, sort:SCORE_DESC){
        id
        title{romaji english}
        coverImage{large}
      }
    }
  }`;

  const data = await request(query,{
    format,
    perPage:limit
  });

  return data.Page.media;
}

export async function searchAnime(title) {
  const query = `
  query ($search: String) {
    Media(search: $search, type: ANIME) {
       title {
        english 
        romaji 
        native
      }

      description(asHtml:true)
      status
      season
      seasonYear
      averageScore
      popularity
      favourites

      bannerImage
      genres

      studios(isMain:true) {
        nodes {
          name
        }
      }

      characters(sort:[FAVOURITES_DESC,ROLE,RELEVANCE], perPage:20) {
        edges {
          node {
            name {
              full
              native
              alternative
            }

            description(asHtml:true)
            gender
            age
            image {
              large
            }

            favourites

            siteUrl
          }

          voiceActors(language:JAPANESE) {
            id
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
    }
  }`;

  const data = await request(query, { search: title });

  return data.Media;
}