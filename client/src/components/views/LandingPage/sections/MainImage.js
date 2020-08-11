import React from "react"
import styled from "styled-components"

export default function MainImage(props) {
	return (
		<Container image={props.image}>
			<DescWrapper>
				<h2> {props.title} </h2>
				<p> {props.text}</p>
			</DescWrapper>
		</Container>
	)
}

const Container = styled.div`
	background: ${(props) =>
		`linear-gradient(to bottom, rgba(0,0,0,0)
  39%,rgba(0,0,0,0)
  41%,rgba(0,0,0,0.65)
  100%),
  url('${props.image}'), #1c1c1c`};
	height: 500px;
	background-size: 100%, cover;
	background-position: center, center;
	width: 100%;
	position: relative;
`
const DescWrapper = styled.div`
	position: absolute;
	max-width: 500px;
	bottom: 2rem;
	margin-left: 2rem;
	> h2 {
		color: #fff;
	}
	> p {
		color: #fff;
		font-size: 1rem;
	}
`
