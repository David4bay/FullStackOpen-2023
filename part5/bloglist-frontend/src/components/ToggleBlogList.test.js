import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToggleBlogList from './ToggleBlogList'

describe('renders content sent in props', () => {

    test('renders content', () => {
        const newBlog = {
            title: 'State of React in 2024',
            author: 'David Bayode',
            view: 'hide'
        }
    
        const { container} = render(<ToggleBlogList 
            title={newBlog.title} 
            author={newBlog.author}
            view={newBlog.view}
            />)
    
        const div = container.querySelector('.brief__BlogDetail')
    
        expect(div).toHaveTextContent(
          'David Bayode'
        )
    })

})


describe('hides blog detail', () => {

    test('hides blog detail', () => {
    
        const newBlog = {
            title: 'State of React in 2024',
            author: 'David Bayode',
            view: 'show more',
            likes: '200',
            url: 'https://www.example.com'
        }
    
        const { container} = render(<ToggleBlogList 
            title={newBlog.title} 
            author={newBlog.author}
            view={newBlog.view}
            />)
    
        const div = container.querySelector('.brief__BlogDetail')

        const moreDetails = container.querySelector('.full__BlogDetail')
    
        expect(div).toHaveTextContent(
          'State of React in 2024'
        )

        expect(div).toHaveTextContent(
          'David Bayode'
        )

        expect(div).toHaveTextContent(
          'show more'
        )

        expect(div).not.toHaveTextContent(
          '200'
        )

        expect(div).not.toHaveTextContent(
          'https://www.example.com'
        )

        expect(moreDetails).toHaveStyle('display: none;')
    })
})

describe('reveal additional details on click', () => {

    afterAll(cleanup)

    test('url and likes revealed on button click', () => {
      const newBlog = {
        title: 'State of React in 2025',
        author: 'David Bayode',
        view: 'show more',
        likes: '23',
        url: 'https://www.example.com',
      };
  
      const { container } = render(
        <ToggleBlogList
          title={newBlog.title}
          author={newBlog.author}
          view={newBlog.view}
          likes={newBlog.likes}
          url={newBlog.url}
        >
        <ul>
            <li>
               {newBlog.title}
            </li>
            <li>
                {newBlog.author}
            </li>
            <li>
                {newBlog.likes}
            </li>
            <li>
                {newBlog.url}
            </li>
        </ul>
        </ToggleBlogList>
      );
  
      const button = container.querySelector('button');
  
      fireEvent.click(button);
  
      screen.debug()

      expect(screen.getByText(newBlog.url)).toBeInTheDocument()

      expect(screen.getByText(newBlog.likes)).toBeInTheDocument()
    }, 100000);
  });

describe('likes can be called multiple times', () => {

    afterAll(cleanup)

    test('like button clicked twice', async () => {

      const mockHandler = jest.fn()
      const newBlog = {
          title: 'State of React in 2025',
        author: 'David Bayode',
        view: 'show more',
        likes: '23',
        url: 'https://www.example.com',
      };

      const blogCaller = () => {
          mockHandler(newBlog) 
      }

      const { container } = render(
        <ToggleBlogList
          title={newBlog.title}
          author={newBlog.author}
          view={newBlog.view}
          likes={newBlog.likes}
          url={newBlog.url}
        >
        <ul>
            <li>
               {newBlog.title}
            </li>
            <li>
                {newBlog.author}
            </li>
           
            <li>
                likes {newBlog.likes}
                <button className="like__Button" type="button" onClick={() => blogCaller(mockHandler)}>add like</button>
            </li>
            <li>
            {newBlog.url}
            </li>
            <li>
                {newBlog.url}
            </li>
        </ul>
        </ToggleBlogList>
      );
        
      
      const button = screen.getByText('show more')
      
        await userEvent.click(button) // reveal hidden children with like button

        const likeButton = screen.getByText('add like')

        await userEvent.click(likeButton)
        
        await userEvent.click(likeButton)

        screen.debug()

        expect(mockHandler.mock.calls).toHaveLength(2)
}, 100000)

})