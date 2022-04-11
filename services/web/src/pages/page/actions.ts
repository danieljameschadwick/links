import { ProfileInterface } from "@src/interfaces/ProfileInterface";

export const fetchProfile = (username: string): ProfileInterface => {
  return {
    username: "dan",
    heading: "Daniel Chadwick",
    subHeading: "Software Developer",
    links: [
      {
        id: 1,
        text: "GitHub",
        url: "https://github.com/danieljameschadwick",
        styles: {
          container: {
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderColor: "#254569",
          },
          text: {
            color: "rgb(17 17 17)",
          }
        },
        logo: {
          uri: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
          altText: "\"GitHub\" logo",
        },
      },
      {
        id: 2,
        text: "www.danielchadwick.co.uk",
        url: "https://www.danielchadwick.co.uk",
        styles: {
          container: {
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderColour: "#000",
          },
        },
        logo: {
          uri: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
          altText: "\"GitHub\" logo",
        },
      },
      {
        id: 3,
        text: "LinkedIn",
        url: "https://linkedin.com/in/danieljchadwick/",
        styles: {
          container: {
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderColour: "#000",
          },
        },
      },
    ]
  };
};
