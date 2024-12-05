# will have to pip install selenium and set up a chrome web driver 
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import random
import time

driver = webdriver.Chrome() 
driver.get('http://127.0.0.1:5500/index.html') 

# flag and unflag function
def flag_and_unflag_cells(cells):
    print("Flagging two random cells...")
    flagged_cells = random.sample(cells, 2)  # randomly pick 2 cells to flag
    
    for cell in flagged_cells:
        ActionChains(driver).context_click(cell).perform()  # right-click to flag
        print(f"Flagged cell {cells.index(cell) + 1}.")
        time.sleep(1)  # add a delay for realism
    
    print("Unflagging the two flagged cells...")
    for cell in flagged_cells:
        ActionChains(driver).context_click(cell).perform()  # right-click again to unflag
        print(f"Unflagged cell {cells.index(cell) + 1}.")
        time.sleep(1)  # add a delay for realism


def play_minesweeper():
    try:
        # wait until the game board is present // got help with this 
        game_board = driver.find_element(By.ID, "game-board")

        
        # get all cells on the game board
        cells = driver.find_elements(By.CLASS_NAME, "cell")

        # flag and unflag two cells at the start
        flag_and_unflag_cells(cells)
        
        game_over = False
        clicked_cells = set()  # keep track of cells that have been clicked
        
        # game loop
        while not game_over:
            # pick a random cell one at a time that hasn't been clicked yet // choice different from sample as it only selects 1
            random_cell = random.choice([cell for cell in cells if cell not in clicked_cells]) 

            # always left-click from now on
            random_cell.click()
            print("Left-clicked on a cell.")

            # add the clicked cell to clicked_cells to avoid clicking it again
            clicked_cells.add(random_cell)

            time.sleep(2)  # adjust this delay as needed

            # check if the clicked cell is a bomb
            if "bomb" in random_cell.get_attribute("class"):
                print("Game Over! Hit a mine!")
                game_over = True  # end the game if a bomb is clicked
            else:
                print("Safe click on cell!")
            
        
        print(f"Game ended after {len(clicked_cells)} actions (clicks).") # states number of clicks before game end. 
        time.sleep(10)
    finally:
        driver.quit()  # close when done

play_minesweeper() # call testing function
