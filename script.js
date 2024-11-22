const topics = {
    html: {
        title: 'HTML Basics',
        description: 'Learn the structure of web pages.',
        keywords: ['Elements', 'Attributes', 'Forms', 'Semantics'],
        lectures: ['Introduction to HTML', 'Forms and Input', 'HTML5 Features'],
    },
    css: {
        title: 'CSS Basics',
        description: 'Style your web pages effectively.',
        keywords: ['Selectors', 'Box Model', 'Flexbox', 'Grid'],
        lectures: ['Introduction to CSS', 'CSS Layouts', 'CSS Animations'],
    },
    js: {
        title: 'JavaScript Basics',
        description: 'Make your web pages interactive.',
        keywords: ['Variables', 'Functions', 'DOM Manipulation', 'Events'],
        lectures: ['Introduction to JavaScript', 'DOM and Events', 'ES6 Features'],
    },
};

function renderFrontPageWithoutJson(container) {
    const data = {
      title: "Web Programming 101",
      menu: [
        { name: "Home", link: "/" },
        { name: "HTML", link: "/?type=html" },
        { name: "CSS", link: "/?type=css" },
        { name: "JavaScript", link: "/?type=js" },
      ],
      footer: "Hópaverkefni 2 2024",
    };

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.href.includes('?type=')) {
          e.preventDefault();
          const url = new URL(e.target.href);
          const topic = url.searchParams.get('type');
          history.pushState({ topic }, '', url);
          renderTopicPage(container, topic);
        }
    });
      
    window.addEventListener('popstate', (e) => {
        const topic = e.state?.topic || null;
        renderTopicPage(container, topic);
    });

    // Create <main> element with class "front-page"
    const mainElement = document.createElement('main');
    mainElement.classList.add('front-page');

    // Create header section
    const headerElement = document.createElement('header');
    const heading = document.createElement('h1');
    heading.textContent = data.title;
    headerElement.appendChild(heading);
    mainElement.appendChild(headerElement);

    // Create menu section
    const menuElement = document.createElement('nav');
    menuElement.classList.add('menu');
    const menuList = document.createElement('ul');
    menuList.classList.add('menu__list');

    for (const menuItem of data.menu) {
      const menuListItem = document.createElement('li');
      const menuLink = document.createElement('a');
      menuLink.href = menuItem.link;
      menuLink.textContent = menuItem.name;
      menuListItem.appendChild(menuLink);
      menuList.appendChild(menuListItem);
    }

    menuElement.appendChild(menuList);
    mainElement.appendChild(menuElement);

    // Create intro content
    const contentElement = document.createElement('section');
    contentElement.classList.add('content');
    const contentParagraph = document.createElement('p');
    contentParagraph.textContent = `Welcome to ${data.title}! Select a topic to learn more.`;
    contentElement.appendChild(contentParagraph);
    mainElement.appendChild(contentElement);

    // Create footer
    const footerElement = document.createElement('footer');
    footerElement.classList.add('footer');
    footerElement.textContent = data.footer;
    mainElement.appendChild(footerElement);

    // Append everything to the container
    container.appendChild(mainElement);
}

function renderTopicPage(container, topic) {
    if (!topic || !topics[topic]) {
        container.innerHTML = '<p>Topic not found.</p>';
        return;
    }

    const { title, description, keywords, lectures } = topics[topic];

    // Clear the container
    container.innerHTML = '';

    // Create <main> element with class "topic-page"
    const mainElement = document.createElement('main');
    mainElement.classList.add('topic-page');

    // Add title and description
    const heading = document.createElement('h1');
    heading.textContent = title;
    mainElement.appendChild(heading);

    const desc = document.createElement('p');
    desc.textContent = description;
    mainElement.appendChild(desc);

    // Add keywords section
    const keywordSection = document.createElement('section');
    const keywordHeading = document.createElement('h2');
    keywordHeading.textContent = 'Keywords';
    keywordSection.appendChild(keywordHeading);

    const keywordList = document.createElement('ul');
    keywords.forEach((keyword) => {
      const item = document.createElement('li');
      item.textContent = keyword;
      keywordList.appendChild(item);
    });
    keywordSection.appendChild(keywordList);
    mainElement.appendChild(keywordSection);

    // Add lectures section
    const lectureSection = document.createElement('section');
    const lectureHeading = document.createElement('h2');
    lectureHeading.textContent = 'Lectures';
    lectureSection.appendChild(lectureHeading);

    const lectureList = document.createElement('ul');
    lectures.forEach((lecture) => {
      const item = document.createElement('li');
      item.textContent = lecture;
      lectureList.appendChild(item);
    });
    lectureSection.appendChild(lectureList);
    mainElement.appendChild(lectureSection);

    // Add "related topics" links section
    const relatedTopicsSection = document.createElement('section');
    const relatedTopicsHeading = document.createElement('h2');
    relatedTopicsHeading.textContent = 'Related Topics';
    relatedTopicsSection.appendChild(relatedTopicsHeading);

    const relatedTopicsList = document.createElement('ul');
    for (const key in topics) {
        if (topics.hasOwnProperty(key) && key !== topic) {
            const relatedItem = document.createElement('li');
            const relatedLink = document.createElement('a');
            relatedLink.href = `/?type=${key}`;
            relatedLink.textContent = topics[key].title;
            relatedItem.appendChild(relatedLink);
            relatedTopicsList.appendChild(relatedItem);
        }
    }
    relatedTopicsSection.appendChild(relatedTopicsList);
    mainElement.appendChild(relatedTopicsSection);



    // Append everything to the container
    container.appendChild(mainElement);

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = 'Home';
    container.appendChild(homeLink);
}

// Initialize the page directly with hardcoded data
renderFrontPageWithoutJson(document.body);
