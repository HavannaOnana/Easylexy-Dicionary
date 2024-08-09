Number = []

for i in range(1,10):
    Number.append(i)


ask = int(input("Search Number : "))

if ask not in Number :
    print("Number not found")

else:
    print(f"{ask} is in the list")