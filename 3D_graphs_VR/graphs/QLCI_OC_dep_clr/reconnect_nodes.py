# -*- coding: utf-8 -*-
"""
Created on Sat Jan 23 16:57:33 2021

@author: pmneves
"""

PI_list1 = ["Barak", "Choi", "Chuang", "Demler", "Hayden", "Lukin", "Natarajan", "Preskill", "Schleier-Smith", "Sudan", "Zwierlein"]
PI_list2 = ["Englund", "Greiner", "Ketterle", "Zwierlein"]
PI_list3 = ["Chandran", "Côté", "Greiner", "Lukin", "Ni", "Sachdev", "Schleier-Smith"]
PI_list4 = ["Checkelsky", "Demler", "Jarillo-Herrero", "Kim", "Lukin", "Park", "Sachdev", "Todadri", "Vishwanath"]
PI_list5 = ["Cappellaro", "Choi", "Englund", "Hu", "Lukin", "Park", "Sushkov", "Todadri"]
PI_list6 = ["Barak", "Cappellaro", "Chandran", "Choi", "Englund", "Han", "Hu", "Lukin", "Notaros", "Preskill", "Vuckovic"]
EC_list = ["Lukin", "Hu", "Ketterle", "Preskill", "Greiner", "Ni", "Cappellaro", "Kim", "Englund"]
EDU_list = ["Côté", "Hu", "Checkelsky"]
PDF1_list = ["PDF1", "Greiner", "Demler"]
PDF2_list = ["PDF2", "Ni", "Sachdev"]
PDF3_list = ["PDF3", "Sudan", "Englund"]
PDF4_list = ["PDF4", "Cappellaro", "Sushkov"]
PDF5_list = ["PDF5", "Hayden", "Zwierlein"]

PI_lists= [PI_list1, PI_list2, PI_list3, PI_list4, PI_list5, PI_list6, EC_list, EDU_list, PDF1_list, PDF2_list, PDF3_list, PDF4_list, PDF5_list]

with open("edge_list.txt", "w") as f:
	for ind, PI_list in enumerate(PI_lists):
		value = ind + 1
		for i in range(len(PI_list)-1):
			name_i = PI_list[i]
			for j in range(len(PI_list)-i-1):
				name_j = PI_list[i+j+1]
				f.write(f'		{{"source": "{name_i}", "target": "{name_j}", "value": {min(value,9)}}},\n')