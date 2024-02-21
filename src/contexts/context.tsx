// context.tsx
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  // useCallback,
} from "react";
import axios from "axios";
import { Canceler } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

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

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | null>(letter);
  const [pageNumber, setPageNumber] = useState(1);

  const searchURLParameters = `api_key=${flickrKey}&text=${
    searchTerm ? searchTerm : letter
  }&format=json&nojsoncallback=1&per_page=20`;

  const combinedSearchURL = flickrSearchURL + searchURLParameters;

  const fetchData = async (url: string) => {
    setLoading(true);
    let cancel: Canceler | undefined;

    try {
      const response = await axios({
        method: "GET",
        url,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      if (response.data && response.data.photos && response.data.photos.photo) {
        const photosArray = response.data.photos.photo;
        setPhotos(photosArray);
      } else {
        console.error("Invalid response format from Flickr API", response.data);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
      } else {
        console.error("Error while fetching data", error);
      }
    }
    setLoading(false);

    return () => {
      if (cancel) {
        cancel();
      }
    };
  };

  useEffect(() => {
    fetchData(combinedSearchURL);
  }, [combinedSearchURL]);

  const fetchMoreData = async () => {
    const newPageNumber = pageNumber + 1;
    const newCombinedSearchURL = `${combinedSearchURL}&page=${newPageNumber}`;

    try {
      const response = await axios({
        method: "GET",
        url: newCombinedSearchURL,
      });

      if (response.data && response.data.photos && response.data.photos.photo) {
        const newPhotosArray = response.data.photos.photo;
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotosArray]);
      } else {
        console.error("Invalid response format from Flickr API", response.data);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
      } else {
        console.error("Error while fetching data", error);
      }
    }

    setPageNumber(newPageNumber);
  };

  return (
    <InfiniteScroll
      dataLength={photos.length} // This is important to prevent calling fetchMoreData on initial render
      next={fetchMoreData}
      hasMore={true} // Set this to false when you don't have more data to load
      loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>} // Optional loading indicator
    >
      <AppContext.Provider
        value={{
          photos,
          setSearchTerm,
          loading,
        }}
      >
        {children}
      </AppContext.Provider>
    </InfiniteScroll>
  );
};

// const handleScroll = () => {
//   const scrollHeight = document.documentElement.scrollHeight;
//   const scrollTop = document.documentElement.scrollTop;
//   const windowViewportHeight = window.innerHeight;

//   if (windowViewportHeight + scrollTop + 1 >= scrollHeight) {
//     setLoading(true);
//     setPageNumber((prev) => prev + 1);
//   }
// };

// useEffect(() => {
//   window.addEventListener("scroll", handleScroll);

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);

// function getShuffledArray(originalArray: Photo[] | [], subset: number) {
//   // Make a shallow copy of the original array to avoid modifying it
//   const arrayCopy = [...originalArray];

//   let temp;

//   // Fisher-Yates shuffle algorithm
//   for (let i = arrayCopy.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));

//     // Swap elements using a temporary variable
//     temp = arrayCopy[i];
//     arrayCopy[i] = arrayCopy[j];
//     arrayCopy[j] = temp;
//   }

//   const slicedArray = arrayCopy.slice(0, subset);
//   return slicedArray;
// }
