import React, { useEffect, useState } from "react"
import { Row, Button } from "antd"

import { API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../../Config"
import { API_KEY } from "../../key"
import GridCards from "../commons/GridCards"
import MainImage from "../../views/LandingPage/sections/MainImage"
import MovieInfo from "./sections/MovieInfo"
import Favorite from "./sections/Favorite"

function MovieDetailPage(props) {
	const movieId = props.match.params.movieId
	const [Movie, setMovie] = useState({})
	const [Casts, setCasts] = useState([])
	const [ActorToggle, setActorToggle] = useState(false)

	useEffect(() => {
		let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
		fetchDetailInfo(endpointForMovieInfo)
	}, [])

	const toggleActorView = () => {
		setActorToggle(!ActorToggle)
	}

	const fetchDetailInfo = (endpoint) => {
		fetch(endpoint)
			.then((res) => res.json())
			.then((res) => {
				setMovie({ ...Movie, ...res })

				let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
				fetch(endpointForCasts)
					.then((res) => res.json())
					.then((res) => {
						setCasts([...Casts, ...res.cast])
					})
			})
			.catch((error) => console.error("Error:", error))
	}

	return (
		<div>
			<MainImage
				image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
				title={Movie.original_title}
				text={Movie.overview}
			/>

			<div style={{ width: "85%", margin: "1rem auto" }}>
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<Favorite
						movieInfo={Movie}
						movieId={movieId}
						userFrom={localStorage.getItem("userId")}
					/>
				</div>

				<MovieInfo movie={Movie} />

				<br />

				<div
					style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
				>
					<Button onClick={toggleActorView}>Toggle Actor View </Button>
				</div>

				{ActorToggle && (
					<Row gutter={[16, 16]}>
						{Casts.map(
							(cast) =>
								cast.profile_path && (
									<React.Fragment key={cast.cast_id}>
										<GridCards
											image={
												cast.profile_path
													? `${IMAGE_BASE_URL}w500${cast.profile_path}`
													: null
											}
											characterName={cast.name}
										/>
									</React.Fragment>
								)
						)}
					</Row>
				)}
			</div>
		</div>
	)
}

export default MovieDetailPage
