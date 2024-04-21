import pandas as pd
 
def make_dataset(path): 
    dataset = pd.read_csv(path)
    df = pd.DataFrame(dataset)
    number_columns = len(df.axes[1])
    df = df.loc[1:]
    
    return df
    
    


print(make_dataset("../../data/processed/heart.csv"))