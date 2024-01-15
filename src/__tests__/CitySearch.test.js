import { render } from "@testing-library/react";
import CitySearch from "../components/CitySearch";

describe("<CitySeach /> component", () => {
  test("renders text input", () => {
    const CitySeachComponent = render(<CitySearch />);
    const cityTextBox = CitySeachComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });
});