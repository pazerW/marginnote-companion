import { App, Menu } from "obsidian";

interface Sources {
  [book: string]:
    | {
        [key: string]: any;
        url: string;
      }
    | string;
}

export const isObjSrc = (obj: any): obj is Sources => {
  if (!(obj instanceof Object)) return false;
  let hasProp = false;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      hasProp || (hasProp = true);
      if (
        typeof key !== "string" ||
        !(typeof obj[key] === "string" || typeof obj[key].url === "string")
      )
        return false;
    }
  }
  return hasProp;
};

const getSrcMenu = (sources: unknown, app: App): Menu | null => {
  if (isObjSrc(sources)) {
    const menu = new Menu(app);
    for (const key in sources) {
      if (Object.prototype.hasOwnProperty.call(sources, key)) {
        const docName = key,
          info = sources[key],
          url = typeof info === "string" ? info : info.url;
        menu.addItem((item) => {
          item
            .setIcon(
              url.startsWith("marginnote4app") ? "mn-fill-color" : "link",
            )
            .setTitle(docName)
            .onClick(() => window.open(url));
        });
      }
    }
    menu.select(0);
    return menu;
  } else return null;
};

export default getSrcMenu;
