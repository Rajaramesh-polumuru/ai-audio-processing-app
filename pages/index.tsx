import { useWhisper } from "@chengsokdara/use-whisper";
import { RiPauseLine, RiStopLine } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  ButtonsWrapper,
  Button,
  ChatMessage,
  ChatHistory,
  UserInputWrapper,
  TextInput,
  SendButton,
  MicrophoneIcon,
  MemeContainer,
  ContentWrapper,
} from "@/components/styled-components";
import Image from "next/image";

const App: React.FC = () => {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
    removeSilence: true,
  });
  const [chatGPTResponse, setChatGPTResponse] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<
    Array<{ user: string; response: string }>
  >([]);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const processTranscript = useCallback(async (message: string) => {
    try {
      setProcessing(true);
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: message,
          max_tokens: 4000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
          },
        }
      );
      const { choices } = response.data;
      const reply = choices[0].text;
      setChatGPTResponse(reply);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { user: message, response: reply },
      ]);
      setProcessing(false);
    } catch (error) {
      setProcessing(false);
      console.log({ error });
    }
  }, []);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      processTranscript(userInput);
      setUserInput("");
    }
  };

  useEffect(() => {
    if (transcript.text) {
      processTranscript(transcript.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Container>
      <ContentWrapper>
        <Heading>Voice Assistant Powered by ChatGPT</Heading>
        <div>
          <h2>Experience the Power of Voice Assistant!</h2>
          <p>
            Our Voice Assistant, powered by ChatGPT, is here to make your life
            easier. With advanced speech recognition and natural language
            processing capabilities, it can understand your voice commands,
            provide real-time responses, and assist you with a wide range of
            tasks. Whether you need information, want to dictate notes, or
            engage in natural conversations, our Voice Assistant is your
            reliable companion.
          </p>
        </div>
        <MemeContainer>
          {recording && !speaking && (
            <Image
              src="/recording.gif"
              width={150}
              height={150}
              alt={"recording"}
            />
          )}
          {speaking && (
            <Image
              src="/im-listening-do-tell.gif"
              width={150}
              height={150}
              alt="speaking"
            />
          )}
          {transcribing && (
            <Image
              src="/transcribing.gif"
              width={150}
              height={150}
              alt="transcribing"
            />
          )}
          {processing && (
            <Image
              src="/processing.gif"
              width={150}
              height={150}
              alt="processing"
            />
          )}
        </MemeContainer>
      </ContentWrapper>
      <ChatHistory ref={chatHistoryRef}>
        {chatHistory.map((message, index) => (
          <ChatMessage key={index}>
            <span>
              <strong>User: </strong> {message.user}
            </span>
            <span>
              <strong>ChatGPT:</strong> {message.response}
            </span>
          </ChatMessage>
        ))}
      </ChatHistory>
      <UserInputWrapper>
        <TextInput
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSendMessage}>
          <AiOutlineSend />
        </SendButton>
        <ButtonsWrapper>
          <Button onClick={() => startRecording()}>
            <MicrophoneIcon />
          </Button>
          <Button onClick={() => pauseRecording()}>
            <RiPauseLine />
          </Button>
          <Button onClick={() => stopRecording()}>
            <RiStopLine />
          </Button>
        </ButtonsWrapper>
      </UserInputWrapper>
    </Container>
  );
};

export default App;
