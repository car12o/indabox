import React, { useState } from "react"
import { useTheme, IconButton, Menu, MenuItem } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import { useApi } from "../../../services/api"

const options = [
  "Inativar utilizador"
]

const ITEM_HEIGHT = 48

export const Options = ({ user, updateUser }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const api = useApi()

  const submit = async () => {
    const { body } = await api.del(`/users/${user._id}`)
    setAnchorEl(null)
    updateUser(body)
  }

  return (
    <div>
      <IconButton
        color="secondary"
        onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            color: theme.palette.secondary.main
          }
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => submit()}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
