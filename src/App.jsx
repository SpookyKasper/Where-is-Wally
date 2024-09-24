import { useEffect, useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import EndGameModal from "./components/EndGameModal/EndGameModal";
import AnswerFeedback from "./components/AnswerFeedback/AnswerFeedback";
import MarkerList from "./components/MarkerList/MarkerList";

function App() {
  const [visible, setVisible] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [relativeCoord, setRelativeCoord] = useState({ x: 0, y: 0 });
  const [markers, setMarkers] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [currentPlayerScoreId, setCurrentPlayerScoreId] = useState(null);

  // Update The Score Record with the name and score

  // Create the record (to start tracking time) when page loads
  useEffect(() => {
    const createScore = async () => {
      const scoreData = { name: "Player1" };
      const response = await fetch("http://localhost:3000/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scoreData),
      });

      const result = await response.json();
      setCurrentPlayerScoreId(result.id);
    };

    createScore();
  }, [setCurrentPlayerScoreId]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const inImgX = Math.round(e.clientX - rect.x);
    const inImgY = Math.round(e.clientY - rect.y);
    setClickCoordinates({ x: e.clientX, y: e.clientY });
    setRelativeCoord({ x: inImgX, y: inImgY });
    setVisible(visible ? false : true);
    setAnswer(null);
  };

  const placeMarker = (marker) => {
    setMarkers([
      ...markers,
      {
        name: marker.name,
        x: marker.x,
        y: marker.y,
      },
    ]);
  };

  return (
    <main>
      <AnswerFeedback answer={answer} />
      <CharacterSelection
        clickCoordinates={clickCoordinates}
        relativeCoord={relativeCoord}
        visible={visible}
        setVisible={setVisible}
        setAnswer={setAnswer}
        placeMarker={placeMarker}
        markersLength={markers.length}
        setGameOver={setGameOver}
      />
      <EndGameModal
        currentPlayerScoreId={currentPlayerScoreId}
        gameOver={gameOver}
      />
      <img onClick={handleClick} src={wallyImg} />
      <MarkerList markers={markers} />
    </main>
  );
}

export default App;
