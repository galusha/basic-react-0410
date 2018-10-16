import React from 'react'
import Enzyme, { render, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CommentListWithToggleOpen, { CommentList } from './comment-list'
import ArticleListWithAccordion, { ArticleList } from './article-list'
import articles from '../fixtures'

Enzyme.configure({ adapter: new Adapter() })

describe('CommentList', () => {
  it('should render all closed comments by default', () => {
    const container = render(
      articles.map((article) => (
        <CommentListWithToggleOpen comments={article.comments || []} />
      ))
    )

    expect(container.find('.test--comments__list').length).toEqual(0)
  })

  it('should be closed comments when article is opened', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    expect(container.find('.test--comments__list').length).toEqual(0)
  })

  it('should be hide the toogle button for comments when article is closed', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    expect(container.find('.test--comments__toogle_button').length).toEqual(0)
  })

  it('should be showen toogle button for comments when article is opened', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    expect(container.find('.test--comments__toogle_button').length).toEqual(1)
  })

  it('should contain the text "show comments" inside the comments toggle button when this button is not clicked', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    expect(
      container
        .find('.test--comments__toogle_button')
        .at(0)
        .text()
    ).toEqual('show comments')
  })

  it('should contain the text "hide comments" inside the comments toggle button when this button is clicked', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    container
      .find('.test--comments__toogle_button')
      .at(0)
      .simulate('click')

    expect(
      container
        .find('.test--comments__toogle_button')
        .at(0)
        .text()
    ).toEqual('hide comments')
  })

  it('should be showen comments list container when comments toggle button when this button is clicked', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    container
      .find('.test--comments__toogle_button')
      .at(0)
      .simulate('click')

    expect(container.find('.test--comments__list').length).toEqual(1)
  })

  it('should be showen comments list items when the comments toggle button is clicked', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    container
      .find('.test--comments__toogle_button')
      .at(0)
      .simulate('click')

    expect(container.find('.test--comments__item').length).toEqual(
      articles[0].comments.length
    )
  })

  it('should contain the special element when the comments are empty', () => {
    const changedArticles = [...articles]
    delete changedArticles[0].comments

    const container = mount(
      <ArticleListWithAccordion articles={changedArticles} />
    )

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    container
      .find('.test--comments__toogle_button')
      .at(0)
      .simulate('click')

    expect(container.find('.test--comments__empty').length).toEqual(1)
  })

  it('should contain the text "show comments" inside the comments toggle button when this button is clicked twice', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    container
      .find('.test--comments__toogle_button')
      .at(0)
      .simulate('click')

    container
      .find('.test--comments__toogle_button')
      .at(0)
      .simulate('click')

    expect(
      container
        .find('.test--comments__toogle_button')
        .at(0)
        .text()
    ).toEqual('show comments')
  })

  it('should not contain comments container when the comments toggle button button is clicked twice', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    container
      .find('.test--comments__toogle_button')
      .at(0)
      .simulate('click')

    container
      .find('.test--comments__toogle_button')
      .at(0)
      .simulate('click')

    expect(container.find('.test--comments__list').length).toEqual(0)
  })
})

//How is better?
//To have only one "expect" in an "it" block and mount component for evety time
//or
//to have a big "it" block with a lot "expect" but it will use mount component rarer

//For example:
// it('should contain the text "show comments" inside the comments toggle button when this button is clicked twice', () => {
//   const container = mount(<ArticleListWithAccordion articles={articles} />)

//   container
//   .find('.test--article__btn')
//   .at(0)
//   .simulate('click')

//   container
//   .find('.test--comments__toogle_button')
//   .at(0)
//   .simulate('click')

//   container
//   .find('.test--comments__toogle_button')
//   .at(0)
//   .simulate('click')

//   expect(container.
//     find('.test--comments__toogle_button')
//     .at(0)
//     .text()
//     ).toEqual('show comments')
// })

// it('should not contain comments container when the comments toggle button button is clicked twice', () => {
//   const container = mount(<ArticleListWithAccordion articles={articles} />)

//   container
//   .find('.test--article__btn')
//   .at(0)
//   .simulate('click')

//   container
//   .find('.test--comments__toogle_button')
//   .at(0)
//   .simulate('click')

//   container
//   .find('.test--comments__toogle_button')
//   .at(0)
//   .simulate('click')

//   expect(container.find('.test--comments__list').length).toEqual(0)
// })

//OR I will combine two expect

// it('should contain the text "show comments" inside the comments toggle button AND should not contain comments container when this button is clicked twice', () => {
//   const container = mount(<ArticleListWithAccordion articles={articles} />)

//   container
//   .find('.test--article__btn')
//   .at(0)
//   .simulate('click')

//   container
//   .find('.test--comments__toogle_button')
//   .at(0)
//   .simulate('click')

//   container
//   .find('.test--comments__toogle_button')
//   .at(0)
//   .simulate('click')

// 1  expect(container.
//     find('.test--comments__toogle_button')
//     .at(0)
//     .text()
//     ).toEqual('show comments')

// 2   expect(container.find('.test--comments__list').length).toEqual(0)
// 3   expect(....
// })
