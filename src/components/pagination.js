import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class Pagination extends Component {
  static propTypes = {
    count: PropTypes.number,
    fetchData: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchData, step, count } = this.props
    fetchData(1, step, count)
  }

  changePage(page) {
    const { fetchData, count, step } = this.props
    const pages = (count && Math.ceil(count / step)) || 0

    if (!page || page > pages) return
    fetchData(page)
  }

  render() {
    const { count, fetchData, step, currentPage = 1 } = this.props
    const pages = (count && Math.ceil(count / step)) || 0
    const pagesArr = Array.from({ length: pages }, (v, i) => i + 1)

    return (
      <nav aria-label="Page navigation example">
        <ul>
          <li onClick={() => this.changePage(currentPage - 1)}>
            <a href="#">Previous</a>
          </li>
          {pagesArr &&
            pagesArr.map((item) => {
              return (
                <li
                  key={item}
                  style={{ color: item === currentPage ? 'red' : 'blue' }}
                  onClick={() => this.changePage(item)}
                >
                  <a
                    style={{ color: item === currentPage ? 'red' : 'blue' }}
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              )
            })}
          <li onClick={() => this.changePage(currentPage + 1)}>
            <a href="#">Next</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Pagination
