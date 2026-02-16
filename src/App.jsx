import ImageZoom from "./components/ImageZoom";
import TEST_IMAGE from "./images/mountains.jpg";

const App = () => {
  return (
    <div>
      <ImageZoom imageUrl={TEST_IMAGE} />
    </div>
  );
};

export default App;
