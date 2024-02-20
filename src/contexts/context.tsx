// context.tsx
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from "react";
import axios from "axios";

interface Photo {
  farm: number;
  id: string;
  secret: string;
  server: string;
  title: string;
}

interface AppContextProps {
  photos: Photo[] | [];
  loading: boolean;
  setSearchTerm: Dispatch<SetStateAction<string | null>>;
}

export const AppContext = React.createContext<AppContextProps | undefined>(
  undefined
);

const flickrKey = "1975d716a3e48f675e709ec72a8fb64f";
const flickrSearchURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&`;

// const flickrSecret = "185717cc41ef5bc1";

interface AppProviderProps {
  children: ReactNode;
}

const alphabetLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const randomNum = Math.floor(Math.random() * 25);
const letter = alphabetLetters[randomNum];

function getRandomSubset(originalArray: [], subsetSize: number) {
  // Make a shallow copy of the original array to avoid modifying it
  const arrayCopy = [...originalArray];

  let temp;

  // Fisher-Yates shuffle algorithm
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements using a temporary variable
    temp = arrayCopy[i];
    arrayCopy[i] = arrayCopy[j];
    arrayCopy[j] = temp;
  }

  // Take the first subsetSize elements as the random subset
  const randomSubset = arrayCopy.slice(0, subsetSize);

  return randomSubset;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | null>(letter);

  const searchURLParameters = useMemo(
    () =>
      `api_key=${flickrKey}&text=${searchTerm}&format=json&nojsoncallback=1&per_page=200`,
    [searchTerm]
  );

  const combinedSearchURL = flickrSearchURL + searchURLParameters;

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios(url);
      const photosArray = response.data.photos.photo;
      const result = getRandomSubset(photosArray, 100);
      console.log(result);
      setPhotos(result);
    } catch (error) {
      console.error("Error while fetching data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(combinedSearchURL);
  }, [combinedSearchURL]);

  return (
    <AppContext.Provider value={{ photos, setSearchTerm, loading }}>
      {children}
    </AppContext.Provider>
  );
};