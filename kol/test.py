def get_list_of_titles():
  """ Ask the user to enter a list of book titles, one per line"""
  titles = []
  while True:
    title = input("Title: ")
    if title:
      titles.append(title)
    else:
      break
  return titles