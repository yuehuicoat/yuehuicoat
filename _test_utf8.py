import sys
content = sys.argv[1].encode('utf-8').decode('utf-8')
with open(r'E:\香港\03\_test_utf8.txt', 'w', encoding='utf-8', newline='') as f:
    f.write(content)
print('OK, bytes:', len(content.encode('utf-8')))