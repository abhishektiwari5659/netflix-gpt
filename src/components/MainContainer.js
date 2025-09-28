import { useSelector } from 'react-redux'
import VideoTitle from "./VideoTitle"
import VideoBackground from "./VideoBackground"

const MainContainer = () => {
    const movies = useSelector(store => store.movies.nowPlayingMovies)
    if(!movies) return null

    const mainMovies = movies[0];
    const { title, overview, id } = mainMovies;

    return (
        <div className='bg-black w-full'>
            <div className="px-4 sm:px-6 md:px-10 lg:px-8 xl:px-8 py-6 sm:py-8 md:py-10 lg:py-8 xl:py-8">
                <VideoTitle title={title} overview={overview} />
                <VideoBackground movieId={id} />
            </div>
        </div>
    )
}

export default MainContainer
