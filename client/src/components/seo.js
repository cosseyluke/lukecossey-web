import React from "react"
import {Helmet} from "react-helmet"

const ROOT_TITLE = process.env.ROOT_TITLE

export const SEO = ({title, description, meta = []}) => {
  const fullTitle = title ? `${title} | ${ROOT_TITLE}` : `${ROOT_TITLE}`

  return (
    <Helmet title = {fullTitle} htmlAttributes={{ lang: "en" }}
            meta={[
              {
                name: `description`,
                content: description,
              }
            ]}
    />
  )
}
