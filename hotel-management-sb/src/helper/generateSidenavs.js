function capitalizeText(text) {
  let words = text.toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }
  return words.join(" ");
}

export const generateNestedNav = (...data) =>
  data.map((item) => {
    const title = item.toLowerCase().trim();
    const link = title.replace(/\s+/g, "-");
    return {
      title: capitalizeText(title),
      icon: "bi bi-chevron-down",
      child: [
        {
          title: `Add ${capitalizeText(title)}`,
          link: `/add-${link}`,
        },
        {
          title: `${title} List`,
          link: `/${link}-list`,
        },
      ],
    };
  });

export const generatedNav = (name) => {
  const title = name.toLowerCase().trim();
  const link = title.replace(/\s+/g, "-");
  return {
    title: capitalizeText(title),
    icon: "bi bi-grid",
    link: `/${link}`,
  };
};
