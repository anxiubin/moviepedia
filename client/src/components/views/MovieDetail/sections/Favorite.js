import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Button } from "antd"

function Favorite(props) {
	const movieId = props.movieId
	const userFrom = props.userFrom
	const movieTitle = props.movieInfo.title
	const moviePost = props.movieInfo.backdrop_path
	const movieRunTime = props.movieInfo.runtime

	const [FavoriteNumber, setFavoriteNumber] = useState(0)
	const [Favorited, setFavorited] = useState(false)
	let variables = {
		userFrom,
		movieId,
		movieTitle,
		moviePost,
		movieRunTime,
	}

	useEffect(() => {
		Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
			setFavoriteNumber(response.data.favoriteNumber)
			if (response.data.success) {
			} else {
				alert("Failed to get number")
			}
		})

		Axios.post("/api/favorite/favorited", variables).then((response) => {
			if (response.data.success) {
				setFavorited(response.data.favorited)
			} else {
				alert("Failed to get data")
			}
		})
	}, [])

	const onClickFavorite = () => {
		if (Favorited) {
			Axios.post("/api/favorite/removeFromFavorite", variables).then(
				(response) => {
					if (response.data.success) {
						setFavoriteNumber(FavoriteNumber - 1)
						setFavorited(!Favorited)
					} else {
						alert("Failed to remove from Favorite list")
					}
				}
			)
		} else {
			Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
				if (response.data.success) {
					setFavoriteNumber(FavoriteNumber + 1)
					setFavorited(!Favorited)
				} else {
					alert("Failed to add to Favorite list")
				}
			})
		}
	}

	return (
		<div>
			<Button onClick={onClickFavorite}>
				{Favorited ? "Remove from Favorite" : "Add to Favorite "}
				{FavoriteNumber}
			</Button>
		</div>
	)
}

export default Favorite
