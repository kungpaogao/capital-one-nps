# National Parks - Capital One

Andrew Gao

May-Jun 2019

## About

This website was written to complete Capital One's National Park Service (NPS) challenge. It allows users to search for parks or states and shows a wide variety of information relating to a chosen park. Information is retrieved using the [NPS API](https://www.nps.gov/subjects/developer/get-started.htm).

### Key Features

- **Search Bar** - the main navigation feature of the website; allows user to search by keyword or state
- **Search Filters** - allows user to refine search results by state or designation (i.e. the type of park)
- **Search Page** - shows search results with park names and descriptions
- **Park Page** - shows all the details about a given park

### Development Features

- **Components** - the structure of the code is split into views (the different pages/routes) and components (reusable snippets of code, e.g., the search bar, dividers, buttons)
- **Data & Variables** - data, types, and variables were also separated into different directories that allows information such as states and their abbreviations to be imported from multiple different files
- **Media Queries** - the last part of development was spent on optimizing the various views for all devices with CSS media queries
- **Modern Web** - used Typescript (yay typing!), Sass (variables!! nesting!!), and Vue (woooooo!!!)

### Process

1. Sketching - on some scrap paper... somewhere
2. Rapid prototyping - I had a basic idea where I knew I wanted there to be a search bar, filtering, and park detail page
3. Refining framework - separating out components to reuse code (search bar, buttons, header) as well as variables/data/types
4. Styling - editing the CSS code to make things look nice and fit correctly; this was a lot of work
5. API panic! - somewhere along the line, I was getting lots of CORS errors (turned out to be a privacy blocker issue)
6. Testing deployment - GitHub pages + single-page apps = bad time
7. Media queries - after seeing the website on my phone, I realized I needed to do this
8. Writing this - what good is code if you can't explain it?

### Challenges

- **Learning** - this is only my second time working with Vue.js and first time working alone with it, so there was a lot of figuring things out; this was definitely the biggest challenge
- **Time** - the original deadline was quite early, so initial code was a little rushed; even with extensions, I started other summer work, and I could add plenty of features
- **API** - I was getting some CORS errors (due to some privacy blockers I have on Firefox) and tried to use a slightly different codebase before figuring things out

### Potential Features

There are a few things I would try to add if I had more time:

- use Figma to better plan out the website (in the beginning)
- NPS icons
- map view to allow exploring by map
- a more interesting home page (maybe with latest articles or changing images)
- creating a backend to handle API calls (more secure)

### Personal Commentary & Reflection

Overall, I had a lot of fun working on this project. It was a really great learning opportunity as I got to get a lot more exposure to Typescript, NPM, Sass, and Vue.js. And, it gave me something to do for the first few weeks of my summer; coding, getting to watch it update live, and listening to music really is fun/relaxing.

If I were to rewrite this in the future (or create another website), I think it would be better to do more detailed prototype designs (maybe using Figma), so I have a stronger sense of direction throughout the project. I would also try to use more structured frameworks such as [Nuxt.js](https://nuxtjs.org/) to learn more about server-side rendering (SSR). And, I would try to use a UI framework like [Vuetify](https://vuetifyjs.com/en/) so that I wouldn't have to spend as much time on CSS (although, I didn't use one on purpose so I would be forced to learn more CSS). That said, I think this was a good start for me, but I definitely hope to get better in the future.

Thanks for the opportunity Capital One!

---

## Developing

This project was built using [Vue.js](https://vuejs.org/) and was written with HTML, [Sass](https://sass-lang.com/), and [TypeScript](https://www.typescriptlang.org/).

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
