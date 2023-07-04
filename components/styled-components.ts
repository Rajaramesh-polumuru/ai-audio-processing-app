import { styled, keyframes } from "styled-components";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";

const backgroundColor = "#000102";
const textColor = "#ffff";
const primaryColor = "#17D3DE";
const backgroundColorLight = "#11262D";
const backgroundColorDark = "#090A0E";
const dangerColor = "#f44336";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  background-color: ${backgroundColor};
  color: ${textColor};
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Heading = styled.h1`
  color: ${textColor};
  margin-bottom: 20px;
  font-size: 28px;
`;

export const MemeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  height: 150px;
`;

export const ChatMessage = styled.div`
  background-color: ${backgroundColorLight};
  color: ${textColor};
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  border-radius: 5px;
  animation: ${slideUp} 0.5s ease-in-out;
  text-align: left;
  gap: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ChatHistory = styled.div`
  margin-bottom: 20px;
  height: 100%;
  overflow: auto;
`;

export const UserInputWrapper = styled.div`
  display: flex;
  align-items: center;
  animation: ${slideUp} 0.5s ease-in-out;
`;

export const TextInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  transition: border-color 0.3s;

  &::placeholder {
    color: #888;
  }

  &:focus {
    border-color: ${primaryColor};
  }
`;

export const SendButton = styled.button`
  background-color: ${primaryColor};
  color: black;
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    background-color: ${primaryColor};
  }
`;

export const MicrophoneIcon = styled(FaMicrophoneAlt)`
  margin-right: 5px;
`;

export const SendIcon = styled(RiSendPlane2Fill)`
  margin-right: 5px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 5px;
`;

export const Button = styled.button`
  background-color: ${primaryColor};
  color: black;
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    background-color: ${primaryColor};
  }
`;

export const Icon = styled.span``;

export const TranscribedText = styled.p`
  font-style: italic;
  margin-top: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
