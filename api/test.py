def process_code(code_str: str):
  N = len(code_str)
  
  # Number left in the sequence
  until = 0
  currentN = ''
  sumN = 0

  for i in range(N):
    x = code_str[i]
    
    if until > 0:
      currentN += x
      until -= 1
    else:
      until = int(x)
      
      if currentN:
        sumN += int(currentN)
        currentN = ''
      
  
  if currentN:
        sumN += int(currentN)
    
  return sumN


code = "123456"
print("Code:", code, "Result:", process_code(code))

code = "245590000"
print("Code:", code, "Result:", process_code(code))

code = "32615345678"
print("Code:", code, "Result:", process_code(code))

code = "111456"
print("Code:", code, "Result:", process_code(code))
