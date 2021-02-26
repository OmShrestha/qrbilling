import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    overrides: {
        MuiTab: {
            root: {
                height: '30px',
                minHeight: '30px',
                '&$selected': {
                    padding: '14px 18px',
                    color: '#fff',
                    backgroundColor: '#A62A22',
                    borderRadius: '40px',
                    margin: '0px 10px',
                }
            },
        },
        MuiTabs: {
            indicator: {
                display: 'none'
            }
        }
    }
})

export default theme