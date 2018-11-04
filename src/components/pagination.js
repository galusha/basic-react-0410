import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class Pagination extends Component {
  static propTypes = {
    count: PropTypes.number,
    fetchData: PropTypes.func.isRequired
  }

  changePage(page) {
    const { fetchData } = this.props
    fetchData(page)
  }

  render() {
    const { pagesCount, currentPage = 1 } = this.props
    const pagesArr = Array.from({ length: pagesCount }, (v, i) => i + 1)

    return (
      <nav aria-label="Page navigation example">
        <ul>
          <NavLink
            to={`/comments/${currentPage - 1 < 1 ? 1 : currentPage - 1}`}
            activeStyle={{ color: 'red' }}
          >
            Previous
          </NavLink>
          {pagesArr &&
            pagesArr.map((item) => {
              return (
                <li
                  key={item}
                  style={{ color: item === currentPage ? 'red' : 'blue' }}
                  onClick={() => this.changePage(item)}
                >
                  <NavLink
                    to={`/comments/${item}`}
                    activeStyle={{ color: 'red' }}
                  >
                    {item}
                  </NavLink>
                </li>
              )
            })}
          <NavLink
            to={`/comments/${
              +currentPage + 1 > pagesCount ? currentPage : +currentPage + 1
            }`}
            activeStyle={{ color: 'red' }}
          >
            Next
          </NavLink>
        </ul>
      </nav>
    )
  }
}

export default Pagination
