_Currency Converter - Rough Dev Notes - for reference_

## HTML
- Body
- Header
    - Heading
    - Dark Mode Toggle Button
- Main
- From-container Section
    - P title
    - Dropdown Class Div
        - Select Dropdown
    - Image (Country Flag)
    - Input Amount Placeholder
- Swap Button
    - Swap Icon     
- To-container Section
    - P title
    - Dropdown Class Div
        - Select Dropdown
    - Image (Country Flag)
    - Output Amount Read-Only
- P Conversion Rate Text


## JS
- Retrieved HTML components using DOM, query selectors

- updateFlag function (_line 13_)
    - Takes the value (Country Name) selected in the dropdown
    -  Uses Flags API to get the country's flag and add it to HTML using .scr and .alt

- Fetch REST Countries API to get Country Names and Codes (_line 20_)
    - converts the retrieved data to .json object
    - forEach() method is used to go through all the countries and put them in const
    - Uses const option1 and option2 to add Options in both dropdowns with .append
    - By default, the converter is kept at US --> IN conversion

- Select event listener (_line 40_)
    -  uses forEach() to traverse through both the select dropdowns
    -  updateFlag() function is called for both to display a new flag when choice is changed

- Actual Conversion -- fromAmount event listener (_line 48_)
    - Input amount from placeholder is converted to float using parseFloat
    - Source and Target Currencies names are retrieves from the dropdowns
    - if else blocks:
        - if fromAmount is NaN or in negative:
            - The output value is kept as empty
            - Conversion rate is also kept empty
        - if Source and Target currencies both are same:
            - input amt. = output amt.
        - fetch Exchange Rate API for all other cases: (_line 65_)
            - fetch converts the amount and returns the res converted to .json obj
            - if the data is converted succuessfully:
                - toAmount display in HTML
            - else:
                - error message shown in HTML output placeholder

- Swap Currencies event listener (_line 82_)
    - On clicking swapIcon button:
        - the select values in dropdown, as well as the flag images are swapped


- Dark Mode Toggle (_line 91_)
    - On clicking toggle button:
        - Dark mode class list from CSS is added to the body
        - stored theme choice in localStorage
        - window loads the previously saved theme once again (_line 99_) 

