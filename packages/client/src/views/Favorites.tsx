import React from "react"

import {SimpleList} from "../components"

type FavoriteItem = {
  title: string
  new: boolean
}

const placeholderItems: FavoriteItem[] = [
  {title: "Honung, 250 gram", new: false},
  {title: "Honung, 250 gram", new: false},
  {title: "Honung, 250 gram", new: true},
  {title: "Honung, 250 gram", new: false},
  {title: "Honung, 250 gram", new: false},
  {title: "Honung, 250 gram", new: false},
  {title: "Honung, 250 gram", new: false},
  {title: "Honung, 250 gram", new: true},
  {title: "Honung, 250 gram", new: false},
  {title: "Honung, 250 gram", new: false},
  {title: "Honung, 250 gram", new: true},
]

export const Favorites: React.FC = () => {
  return (
    <div>
      {placeholderItems.map((item, index) => (
        <SimpleList title={item.title} newItem={item.new} key={index} />
      ))}
    </div>
  )
}