import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { API_KEY } from "../../key"
import { API_URL, IMAGE_BASE_URL } from "../../Config"
import MainImage from "./sections/MainImage"
import GridCards from "../commons/GridCards"
import { Row } from "antd"

function LandingPage() {
	const [Movies, setMovies] = useState([])
	const [MainMovieImage, setMainMovieImage] = useState(null)
	const [CurrentPage, setCurrentPage] = useState(0)

	const fetchMovies = (endpoint) => {
		fetch(endpoint)
			.then((res) => res.json())
			.then((res) => {
				setMovies([...Movies, ...res.results])
				setMainMovieImage(res.results[0])
				setCurrentPage(res.page)
			})
	}

	const loadMoreMovies = () => {
		const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
			CurrentPage + 1
		}`
		fetchMovies(endpoint)
	}

	useEffect(() => {
		const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
		fetchMovies(endpoint)
	}, [])

	return (
		<Container>
			{MainMovieImage && (
				<MainImage
					image={
						MainMovieImage.backdrop_path
							? `${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`
							: null
					}
					title={MainMovieImage.original_title}
					text={MainMovieImage.overview}
				/>
			)}
			<MovieListWrapper>
				<h2>Movives by latest</h2>
				<hr />

				<Row gutter={[16, 16]}>
					{!!Movies.length &&
						Movies.map((movie) => (
							<React.Fragment key={movie.id}>
								<GridCards
									image={
										movie.poster_path
											? `${IMAGE_BASE_URL}w500${movie.poster_path}`
											: null
									}
									movieId={movie.id}
									movieName={movie.original_title}
								/>
							</React.Fragment>
						))}
				</Row>
			</MovieListWrapper>

			<LoadMoreBtnWrapper>
				<LoadMoreBtn onClick={loadMoreMovies}>Load More</LoadMoreBtn>
			</LoadMoreBtnWrapper>
		</Container>
	)
}

export default LandingPage

const Container = styled.div`
	width: 100%;
	margin: 0;
`
const MovieListWrapper = styled.div`
	width: 85%;
	margin: 1rem auto;
`
const LoadMoreBtnWrapper = styled.div`
	display: flex;
	justify-content: center;
`
const LoadMoreBtn = styled.button``
