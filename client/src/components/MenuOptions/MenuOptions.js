import React, { useState } from "react"
import { useTheme, IconButton, Menu, MenuItem } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"

const ITEM_HEIGHT = 48

export const MenuOptions = ({ classes = {}, options }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()

  return (
    <div>
      <IconButton
        classes={{ root: classes.button }}
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
            width: "25ch",
            color: theme.palette.secondary.main
          }
        }}
      >
        {options.map(({ label, onClick }) => (
          <MenuItem
            key={`key-${label}`}
            onClick={() => {
              setAnchorEl(null)
              onClick()
            }}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
