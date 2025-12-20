import pandas as pd

# Load the uploaded file
file_path = '/mnt/data/categories.csv'
categories_df = pd.read_csv(file_path)

# Display the dataframe to understand its structure
categories_df.head()

# We will use a more sophisticated approach leveraging word embeddings and semantic similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Define the target categories
target_categories = ['Retail', 'Industrial', 'Office', 'Multifamily', 'Student', 'Hospitality']

# Create a TF-IDF Vectorizer
vectorizer = TfidfVectorizer()

# Fit the vectorizer on the target categories
target_vectors = vectorizer.fit_transform(target_categories)

# Function to map category using semantic similarity
def map_category_semantic_advanced(category):
    category_vector = vectorizer.transform([category])
    similarities = cosine_similarity(category_vector, target_vectors)
    most_similar_index = similarities.argmax()
    return target_categories[most_similar_index]

# Apply the advanced semantic mapping to the dataframe
categories_df['Mapped Category'] = categories_df['retail'].apply(map_category_semantic_advanced)

tools.display_dataframe_to_user(name="Mapped Real Estate Categories with Advanced Semantic Mapping", dataframe=categories_df)

categories_df.head()