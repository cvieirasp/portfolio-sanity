import React, { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import sanityClient from '../client';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function About() {
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    sanityClient.fetch(`*[_type == "author"] {
      name,
      bio,
      "authorImage": image.asset->url
    }`).then(
      (data) => setAuthorData(data[0])
    ).catch(console.error)
  }, []);

  if (!authorData)
    return <div>Loading...</div>

  return (
    <main className="relative bg-gray-700">
      <div className="p-10 lg:pt-48 container mx-auto relative">
        <section className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
          <img 
            className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8" 
            src={urlFor(authorData.authorImage).url()} 
            alt={authorData.name}
          />
          <div className="text-lg flex flex-col justify-center">
            <h1 className="cursive text-6xl text-green-300 mb-4">
              Olá! Eu sou <span className="text-green-100">{authorData.name}</span>
            </h1>
            <div className="prose lg:prose-xl text-white">
              <BlockContent blocks={authorData.bio} projectId="odku965i" dataset="production" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
