import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render,screen,waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>);
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>);
    const firstName = screen.getByLabelText(/First name*/i);
    userEvent.type(firstName, 'Cheyenne')

    const lastName = screen.getByLabelText(/Last name*/i);
    userEvent.type(lastName, 'bowman')

    const address = screen.getByLabelText(/Address:*/i);
    userEvent.type(address, '205 homeny lane')

    const city = screen.getByLabelText(/City:*/i);
    userEvent.type(city, 'nashville')

    const state = screen.getByLabelText(/State:*/i);
    userEvent.type(state, 'Tennessee')

    const button =await screen.getByRole('button');
    userEvent.click(button);

    await waitFor(()=> {
    const output = screen.queryByText(/Cheyenne/i);
    expect(output).toBeInTheDocument();

    const out = screen.queryByText(/bowman/i);
    expect(out).toBeInTheDocument();

    const put = screen.queryByText(/Address:*/i);
    expect(put).toBeInTheDocument();

    const place = screen.queryByText(/City:*/i);
    expect(place).toBeInTheDocument();

    const home = screen.queryByText(/State:*/i);
    expect(home).toBeInTheDocument();
    
    const Message = screen.getByTestId('successMessage');
    expect(Message).toBeInTheDocument();
    });
});
