import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('new blog function is called', () => {

    afterAll(cleanup)

    test('create new blog handler called', async () => {

        const newBlog = {
            title: 'The State of React in 2024',
            author: 'David Sunday Bayode',
            url: 'https://www.example.com'
        }

        const mockHandler = jest.fn()

        render(<CreateBlogForm 
        input={newBlog} 
        handleInput={(e) => e.target.value}
        handleNewBlogSubmit={mockHandler}
        />
        )

        const submitButton = screen.getByText('create')

        await userEvent.click(submitButton)

        expect(mockHandler.mock.calls).toHaveLength(1)
        
    }, 100000)
})