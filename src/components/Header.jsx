import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { signOutAPI } from "../action";
import { Link } from "react-router-dom";


const Container = styled.div`
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	padding: 0 24px;
	position: sticky;
	top: 0;
	left: 0;
	/* width: 100vw; */
	z-index: 10;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	margin: 0 auto;
	height: 100%;
	max-width: 800px;
`;

const Logo = styled.span`
	margin-right: 8px;
	font-size: 0;
`;

const Search = styled.div`
	opacity: 1;
	flex-grow: 1;
	position: relative;
	@media (max-width: 768px) {
		flex-grow: unset;
	}
	& > div {
		max-width: 280px;
		input {
			border: none;
			box-shadow: none;
			background-color: #eef3f8;
			border-radius: 2px;
			color: rgba(0, 0, 0, 0.9);
			width: 218px;
			padding: 0 8px 0 40px;
			line-height: 1.75;
			font-weight: 400;
			font-size: 14px;
			height: 34px;
			vertical-align: text-top;
			border-color: #dce6f1;
			@media (max-width: 768px) {
				width: 140px;
			}
		}
	}
`;

const SearchIcon = styled.div`
	width: 40px;
	z-index: 1;
	position: absolute;
	top: 10px;
	left: 5px;
	border-radius: 0 2px 2px 0;
	margin: 0;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Nav = styled.nav`
	margin-left: auto;
	display: block;
	@media (max-width: 768px) {
		position: fixed;
		left: 0;
		bottom: 0;
		background: white;
		width: 100%;
	}
`;

const NavListWrap = styled.ul`
	display: flex;
	flex-wrap: nowrap;
	list-style-type: none;
	justify-content: space-between;
	.active {
		span::after {
			content: "";
			transform: scaleX(1);
			border-bottom: 2px solid var(--white, #fff);
			position: absolute;
			left: 0;
			bottom: 0;
			transition: transform 0.2s ease-in-out;
			width: 100%;
			border-color: rgba(0, 0, 0, 0.9);
		}
	}
`;

const NavList = styled.li`
	display: flex;
	align-items: center;
	a {
		align-items: center;
		background: transparent;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		font-weight: 400;
		justify-content: center;
		line-height: 1.5;
		min-height: 52px;
		min-width: 100px;
		position: relative;
		text-decoration: none;
		span {
			color: rgba(0, 0, 0, 0.6);
			display: flex;
			align-items: center;
			text-align: center;
		}
		@media (max-width: 768px) {
			min-width: 50px;
			font-size: 9px;
			span > img {
				width: 40%;
			}
		}
	}
	&:hover,
	&:active {
		a {
			span {
				color: rgba(0, 0, 0, 0.9);
			}
		}
	}
`;

const SignOut = styled.div`
	position: absolute;
	top: 45px;
	background: white;
	border-radius: 0 0 5px 5px;
	width: 100px;
	height: 40px;
	font-size: 16px;
	text-align: center;
	transition-duration: 167ms;
	display: none;
	z-index: 15;
`;

const SignOutMobile = styled.div`
	display: none;
	@media (max-width: 768px) {
		display: flex;
		padding-left: 1rem;
		font-size: 14px;
	}
`;

const User = styled(NavList)`
	a > img {
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}
	span {
		display: flex;
		align-items: center;
	}
	&:hover {
		${SignOut} {
			@media (min-width: 768px) {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
`;

const Work = styled(User)`
	border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

function Header(props) {
	return (
		<Container>
			<Content>
				<Logo>
					<Link to="/home">
						<a href="/home">
							<img src="/images/lastcoffeelogo.svg" alt="" />
						</a>
					</Link>
				</Logo>
				
				{/* <Search>
					<div>
						<input type="text" placeholder="Search" />
					</div>
					<SearchIcon>
						<img src="/images/search-icon.svg" alt="" />
					</SearchIcon>
				</Search>
	*/}
				
				<Nav>
					<NavListWrap>
						<NavList>
							<Link to="/myprofile">
								<a href="/myprofile">
									<img src="/images/Profile.svg" alt="" />
									<span>My Profile</span>
								</a>
							</Link>	
						</NavList>
						<NavList>
							<Link to="/mycalendar">
								<a href="/mycalendar">
									<img src="/images/Calendar.svg" alt="" />
									<span>My Calender</span>
								</a>
							</Link>	
						</NavList>
						<NavList>
							<Link to="/todolist">
								<a href="/todolist">
									<img src="/images/Todo.svg" alt="" />
									<span>To-Do List</span>
								</a>
							</Link>	
						</NavList>
						<NavList>
							<Link to="/studybuddies">
								<a href="/studybuddies">
									<img src="/images/StudyBuddy.svg" alt="" />
									<span>Study Buddies</span>
								</a>
							</Link>	
						</NavList>
						<NavList>
							<Link to="/myhistory">
								<a href="/myhistory">
									<img src="/images/History.svg" alt="" />
									<span>My History</span>
								</a>
							</Link>
						</NavList>
						<User>
							<a>
								{props.user && props.user.photoURL ? <img src="/images/LogOut.svg" alt="" /> : <img src="/images/user.svg" alt="" />}
								<span>
									Sign Out 
								</span>
							</a>
							<SignOut onClick={() => props.signOut()}>
								<a>Sign Out</a>
							</SignOut>
						</User>
						
					</NavListWrap>
				</Nav>
			</Content>
		</Container>
	);
}


const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);