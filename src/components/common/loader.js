import React from 'react'
import { Consumer as LanguageConsumer } from '../../contexts/language'
const loaderTranslations = require('../../translations/loader.json')

function Loader() {
  return (
    <LanguageConsumer>
      {(lng) => (
        <h3>
          {loaderTranslations[lng].loading}
          ...
        </h3>
      )}
    </LanguageConsumer>
  )
}

Loader.propTypes = {}

export default Loader
