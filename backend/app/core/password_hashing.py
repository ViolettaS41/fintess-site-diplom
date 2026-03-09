from security import hash_password

password = '12345'

hashed = hash_password(password)

print(hashed)