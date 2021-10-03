
import React from "react";
import {render, screen} from '@testing-library/react'
import App from '../App';

import '@testing-library/jest-dom'

describe("App Container", () => {
  it("should healthcheck the app container", () => {
    const { container,debug } = render(<App />);
    expect(container.querySelector(`[data-testid="app-container"]`)).toBeInTheDocument();
  });
});
