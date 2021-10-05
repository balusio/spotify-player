import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App';
describe('App Container', () => {
  it('should healthcheck the app container not logged in', () => {
    const { container } = render(
      <>
        <App />
      </>
    );
    expect(
      container.querySelector(`[data-testid="app-container"]`)
    ).toBeInTheDocument();
    expect(
      screen.getByText('Spotify Stalker, login to check what are you doing')
    ).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();
  });

  describe('Logged user', () => {
    const { location } = window;

    beforeAll(() => {
      Object.defineProperty(window, 'location', {
        value: {
          hash: '#access_token=testToken&state=123456',
          pathname: '/logged',
          assign: jest.fn(),
          replace: jest.fn(),
        },
        writable: true,
      });
    });

    afterAll(() => {
      Object.defineProperty(window, 'location', location);
    });

    it('should be logged in with the param credentials, and continue to the Dashboard', () => {
      render(<App />);
      expect(screen.getByText('Welcome')).toBeTruthy();
    });
  });

  describe('log user through token in localStorage', () => {
    beforeAll(() => {
      const dateNow = new Date();
      const tokenData = {
        token: '123456',
        expiresIn: '3600',
        timeSetted: dateNow.toDateString(),
      };
      localStorage.setItem('token', JSON.stringify(tokenData));
    });

    it('should not log the user if the token is expired', () => {
      localStorage.removeItem('token');
      const dateLessHours = new Date();
      dateLessHours.setHours(dateLessHours.getHours() - 2);
      const tokenData = {
        token: '123456',
        expiresIn: '3600',
        timeSetted: dateLessHours.toDateString(),
      };
      localStorage.setItem('token', JSON.stringify(tokenData));

      render(<App />);
      expect(
        screen.getByText('Spotify Stalker, login to check what are you doing')
      ).toBeTruthy();
      expect(screen.getByText('Login')).toBeTruthy();
    });

    it('should render the user based on the localStorage token', () => {
      render(<App />);
      expect(screen.getByText('Welcome')).toBeTruthy();
    });
  });
});
