import React, { useState, useEffect, useRef } from "react";
const LOGO_B64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAH0AfQDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYHBAUIAwIB/8QAWhAAAQMDAQMHBgUNCwoHAQAAAAECAwQFBhEHEiEIEzFBUXGBFCJhkaGxMkKywdEVFiMzNlJicoKTorPCFxgkJkNGVWV0lNIlNDU3VmN1g5KjU1Rkc8Ph8OL/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAwEQEAAgEDAgUCBQQDAQAAAAAAAQIDBBExEiETMkFRYSKRI0JxobEUUmLwgcHhM//aAAwDAQACEQMRAD8A4yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+tRXORrUVVXgiJ1n4brA2o7NrI1U1Ra+Hh+Whe22bYxBXtnv2JQsp6pEV89C1ERkvSqqxOp3oM75a0tET6tKYrXrMx6Obwfr2uY9WORWuauiovUp+GjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvNn/3dWL/iEHy0O5e04c2eJrnlhT+sYPlodxoefreYeho/LLirbBbWWraVfKSJqMj8qdIxqdSP875yJlh8otETa5dtOtsK/wDaaV4duOd6RLiyRteYAAXUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEg2bprtAsCf1jB8tDuFDiHZimu0TH0/rCH5aHb55+t5h6Gj8suO+UFIku1m8OR2uixt9TGoQEle1+o8p2m5BKi6p5a9qL3cPmIoduONqRDiyTvaQAF1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJNl3+sbHv+IQ/KQ7eOJ9kULp9pmPRt6fLmO9S6/Mdr9R52t80PQ0cfTLhPMHrJlt4e5dVdXTqq/wDMcao2eWfdTdv7dN8tTWHoV4cE8gAJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALG5ONEtZtXty6IraeOWZ3g1U96odeKcy8kukSTMrnWK3XmaLdR3ZvPT6DppTy9ZbfJt7PT0kbY9/dwll6aZbeE7K+dP+441RtMv+6y8f26f9Y41Z6ccPNnkABKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0XyRaBWWq+XJyL9kmjhbw6moqr8pPUXupWHJlolpdltNMqaLVVMsuunVru/slnnj6i2+SXr4K7Y4cI5f8AdZeP7dP+scas2uYfdbeP7fP+scao9evDyZ5AASgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAybVSvrrnS0Ufw6iZkTe9yonzgdqbLaBLZs8sVGnxKNirw6Vd5y+8kp5UkDaekhp2JoyJiManoRND1PCtPVbd7dY6a7OEsw+628f2+f9Y41Rtcx+668f2+f9Y41R7leHizyAAlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABM9iVudc9qVigRqq1lRzz/QjEV3zIQwujkmW3yjMblcnMRW0lJuIq9Tnu+hqmea3TSZaYq9V4h0RkNyS2UcMi6b09VDTs17XvRvzmx6ittsN0SPKcJszHpvVF3ZO5uvS1nBOvo1d7CylPItWYiJ93rVtE2mHCWYLrl15Xtr5/1jjVG1y/7rLx/b5/1jjVHtRw8aeQAEoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOo+Srako8CqLm5io+vqnKir1tZ5qaeO8cuoiqqIiaqvQh23gdBHjOzq20s+kbaSiSSVexdN53tVTk1ltqbe7q0ld77+yl9pV68t5SFkp2PR8dvqaeBEReCKrkc5P0jo44sx25Pu21633WRfOqrxHL65E0O0kQ59TXp6Y+HRprdXVLhHLdfrqu+vT5dN8tTWG0y37qrvp/56b5amrPSjh50gAJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACU7KLK6/7QrPb9xXRLUtkm06mMXeX3aeJ01t9vTbJswuO6uk1W1KWJPS/gv6KKVhySrGst4uuQyx6sp4kpYXL0b7tHO9SI3/qPjlZX5ai+W3HY3JuUsS1Eui9Ln8G69yJ7TiyfiZ4r7Oyn0YZt7qr2eoq53YUTp+qEHy0O5U4HDWz525nVid/WEHy0O5F+CU1vMNNFxLg/Jl3sjubu2rlX9NTXGdkHG/XBf/VSfKUwTvjh58gAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkuzHH35NnNrtO4roXztfP6Imrq72cPEiZ2jeUxG87Q6g2J2WPFtl1D5SqRPmjWuqXO0Td30RfY3T1HKud3uTI8vud5e5VSpnc6PXqYnBqepEOneUJkCY5s2npKZzY6iv0o4URdFRip56p2aNTTxQ5HOXSxNt8k+rp1MxG1I9G4wlVbmVkVOq4QfrGndL/AICnCuE6fXnZNej6o0+v5xp3RL9qev4JlrY71a6PiXBd5XW8Vq9tRIv6SmIZFzXeuVU7tmevtUxz0HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdDck3GtymuGVTs0dIq0lMqonwU0V6p46J4KUDbaOouNwp6CkjWSeokbFG1Otyroh1/dp6PZhsi3I1Zv0NJzUX+8ndrx8XLqc2ptPT0RzLo01Y6uqeIUVylMnbfc8dbqaRVpbW1YNNeCy6+evuTwKtPSpmlqaiSonesksr1e9y9LnKuqqeZvSsUrFYY3tNrTMtpiTt3K7Q7jwroV4f+407rm4QvX8FThDGl3cjtjuyriX9NDu2pXSllXsYvuOLW81dmj4s4JuH+f1H/ALrvep4HpVO3qmV3a9V9p5ne4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9aSnmq6qKlp41kmmekcbE6XOVdET1gXDyXMT+qeSz5JVQo6mtybkKu6FmcnSn4qcfFD65UuWJcsip8ZpJldT27z6hE6FmXq/JT3qWo3yHZLsf8/cWop4dOjjNUv1Xx4r6kOSrhV1FfXT1tXK6WeeRZJHuXVXOVdVU5Mf4uScnpHDqyT4eOKes8vAAHW5WXZ383d6OT72oYvqch3fWO1t8zupYnL7Dgyg4V1Ov+9b7zu6tdu2Sd/ZTuX9E4db+V3aP8zgteK6n4AdzhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC6uS/hv1SvkmV1saLS0CqymRycHzKnFfyUX1qnYVNjVmrcgvtHZ7fGr6iqkRjfQnWq+hE1XwOmNo96oNley+lsFnc1tfLCsFPx87Vftkqp26qvrOfPaduivMt8FY367cQq7lIZsmRZQlkoZd63WtysVU6JJvjL4dHrKnP1zlc5XOVVVV1VV6z8NqVilYiGV7Te02kABZV6U7t2ojd2PRfad13J38V6l3/o3r+gcIoui6od03Vf4m1bv6vev/bU4dZzV26T8zhUAHc4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALI2EYE7MMj8rrolWz0DkdUKvRI7pbH86+gra0VjeVq1m07QsbYDi1JiOJ1ee5CjYJJYHOi5xERYoE468fjOVPd2lK7R8rrMxyqpvFSrmxKu5TRKvCKNOhO/rX0qWFyjNoDbrW/WlZpEbbqJ+lQ5mm7LInBGpp8Vvv7imTLDWZmcluZ/hrltERFK8R/IADdgAAAdy3Z/wDEGqk/qx6/9o4aO37q9rdmtU92m6lpcq/mji1fNXZpOLOIAAdrjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN/imHZJlE7Y7Lap6hiros27uxN73LwImYjlMRM9oaAHQOKcnf4MuTXniioqwUbeHpRXu+ZPEtDHtmOEWRjUpbBSyytT7bUpzr1Xt1d0eBz31eOvHd0V0uS3PZx9a7JeLo5qW611tXvLoixQucnrRNCX2jY7tBuLWvSxrSscmqOqZmR+zXX2HX8MUUMaRwxsiY1NEa1NEQ8aqvoaRNaqtpoE01+yStb71OedbafLDeNHWPNLmq38nvLJtPK7la6bjx0e56onqQ3tFycHdNZladHRFRfOr/mLZrtomDUSqk+U2veRdFayoR6p4NVTXQ7WcHqK6GhornLW1MzkZHFT073q5V7kI8bUT3j+E+DgjtP8oZBydMeaic/f7pIv4DI2+9FLNxzE7Xj+KJjls52Gm5tWula7SV6r0vVU619HQYW0HaDj+EwQPu0sr5qhV5ungajpFb1uVFVOHQQWblD4un2q03R/4yMT51Kfj5Yj2X3w4pn3b2PYhs+a5XSW2qmcq6qr6x/H1KhlR7GtnTP5v73fUyr+0Q+XlF2VF+x49Xu75WIY7+UbQa+bjNSvfUt+gvFNR8/dXr0/wn7dkezxNU+tuDxkk96uPRmynZ8zoxmkX8ZXL73FdryjaHRf4s1OvV/CU+gJyjaLrxio/vSfQR4eon3+5GTT/wCwshuy/AG9GL0Hi1fpPtuzPA06MXt35v8A+ytm8o23fGxqqTuqG/Qfacoy1deOVv55v0EeFqPn7p8XB8fZZTNneDtTRMYtnjChJJaWmlonUUkDHUzmc06JU81W6aaadmhSacoyzr/N2u/OsLaul9gt+IT5HLC90MNH5WsbVTeVEbvad5nkpljbqaY74p36WG3AsLamiYtaf7s36D6TBcN6sYtP91b9BWicorH/AOgrkn5bD6/fE47/AEHcf+phfwc/z91PFw/CyvrHw7/Zm0/3Vv0D6yMP/wBmbT/dW/QVt++Ixz+hbl62fSP3xGOf0LcvWz6SPBz/ACeLgWT9ZGHf7M2n+6t+g/FwbDV6cYtP91b9BW374nHf6EuPrZ9J8O5RVgT4NhuK/lsJ8HP8/c8XD8fZZK4Hha9OL2n+7N+g/F2f4Sv81rT4U7StF5Rdk6sdr1/5rD5XlGWjqxyu/PMHg5/n7k5cHx9llO2dYO7pxi2+EKHkuzTA16cXt35v/wCyt38o22/ExqrXvqG/QebuUdSfFxefT01Tf8Jbws/z90eLg/2Fku2YYC7pxa3+DV+k837Kdnz+nGKNO5XJ85XD+UdTfExeZe+qRP2THl5R0n8lizPy6v8A/keFqPn7o8bB8fZZS7I9ni/zbg04/wArInznjJsa2dP/AJvo3uqpU/aKzXlHXHqxel8ap3+E+Hco27L8HGaJO+ocvzExi1Hv+6vi4Pb9ljybEtnb+i0Ts/Fq5P8AEeD9hWz9yebR1ze6rcV3Jyi78v2vHrc3vlep4P5RGUL8CzWlvhIv7RbwtR7/ALo8TB7fssGXYDg718ya6x906L72mNJye8Rd8C43Zv8AzGf4SAv5QmXr8G3Whv8Ay3r+0eEm3/NXJo2ntbV06UhXh7SYx6j3VnJg9k9l5O+Nu+13q5s70YunsMaTk5WlfteSVzfxoGr85AZNu2evXzZ6Bn4tMnzqY79t20Ny8LpTt7qVn0F+jUf3K9en/tT2Xk4U279iyuZF/CokVPloYc3Jxq0+05VA78ejVP2iBz7Ytosq6/XC9n4lPEn7JiybVNoL145RWp+KjE9yFopn/uhWb4P7U6n5Ol/an2HILbJ+NG9vzKYUvJ8y9uu5cLU/8t6fskIl2i51Kvn5VdPCdU9xiS5rl0v2zJbq7vqn/SXiub1mFZti9pTWfYNnbNdxtslT8Gq096GtrNjWf0rd59rp3J+DWRfO5CHz3++T689ebhJr071S9fnMOWqqpU0lqZnp+E9VLxGT1mPt/wCqTNPSP3/8by7YTk9qp31FdbOaiYm85yTxu0T8lykdALxv6s5AASAAAAAAAAAAAAAAAAAAAHpTwzVE8dPTxPllkcjWMYmrnKvQiJ1qeZ1DyfNm0NitcWSXina661TN6Fj0/wA3YvRw++XrXqRe8zy5Yx13lpixzkttDS7K9hcEcUF2zNFfMujmW9rvNb6JO1fQil5U1PRWyhbFTxQUdLEnBrERjGInXonBEI5tJzyy4Ra0qLhJztXIn8HpGL58i9voTtVTlvPdpOT5hO9K2tfTUS/Bo4HK2NE9P3y95wxTJqO8ztDtm+PBG1Y7ui8v2yYVjz3wsrH3SpbqnN0Wj0RexXaoiFV5DyhMhqVfHZbXR0Ea8Gvm1lfp7ET1KUsDqppsdfTdzX1OS3qld52jZvdt9KvJbgjHKqqyGVYm92jdOBGKieeokWSomkmevS57lcvrU8z6ijfLK2KJjnveqNa1qaqqr0IiG8ViOGEzM8kUb5ZGxRMc971RrWtTVVVehEQvrEbVatj+LfXVkrI58krI9KKi4K6JFTo7UX75ezghrsWs1n2U2ZmU5dEypyKdutttuqK6Hse7sX09XQnEqvLciuuUXqa7XepdNPIvmt+JG3qa1OpEMp/FnaOP5ax+H3nl8ZTfrlkl7qLvdah01TO7VdV4MTqa1OpE7DVgGzEAAAAAAAB9RJrK1O1yIdj7SlSn2KXVvRpakZ2dLUQ49tzFluFNE1NVfK1qJ3qh1zt3lSk2PXWPXdV0UUSf9TeHsOTUxvekfLq087VvPw4/AB1uUALdmwayJs08njp3LlrLey7vRXLrzCv03NNdNd3RdCtrRXlatZtwqIEl2YxWWpzWgor/AE3P0FW5YHJvK1WOcmjXaovU7Q1uU2maw5HX2eoRecpJ3R8etEXgvimik799kbdt2sBJNmlhjyLMaKgqU/gTFWesdrpuws4v49XDh4kg2f0GN3naBenS2ls1op6Wpqael5xyeazi3jrrrp7yJtEbpiszsrsE+TK8Beu7Js5jRi9KsuMiOTu4H1ecWx6945VZHg81U1tCm/XWyqVHSws+/a5PhNQdXvB0+0q/BN7JY7Zkmz6tdbqbm8gtCrPMjXKvlVOvSqJ2t9BCmNc97WMarnOXRETpVSYndExs+QTjPLNaMYtdrx9adsuQORJ7nNvr9h3uLYUTXTXRUVTF2t2m3WXMpKC10/MU7aaB25qq+csaK5ePaqkRaJTNZhEQAWVAT3EbHYrfhM2bZLSy3CHytKOioY5NxJJN3eVz3JxRvBeCGZaL1s/yCqZZ7niMdl8pekcVdR1LlWFy8EVyO6U7Sk3+F4p8q2BYOL45aIc1uuEX9sa1E+9BQ1yOVEimTVWO4LorXcOkhF1oKq13Kot1bEsVRTyLHIxepUUtExKsxMMUE3tlktdo2d1OSX6m5+ruKrT2inc5U00+HMummqJ0J6Tzvlmt1Pslx69w0yMr6qtqIp5d5fPa1V3U06OBHVCemUMABZUBbGzbCbFccRR17jcl1vj5orMquVu6sbNd7uV3AqqeKSCeSGVqtkjcrXNXpRUXRUKxaJmYWmsxES+AZ2PwRVV/t9LO3eimqoo3t7Wq9EVDbbTrbR2fPrzbLfFzNLT1KsiZqq7qaJw4k799kbdt0bABKAAAAAAAAAAAAAAAAAAATfYjjUWUbRKCiqWq6kg1qZ00+E1nFG+LtE8TrXLL1SY3jdZeatdIaSJX7qfGX4rU710TxKL5IVMx1zyGsVE344YY2r1ojleq/JQkfKxuktNhtvtbF0bWVe9J6Wsbrp61T1Hn5vxM0Ud+GfDwzeOXPWW5Bccnv1TeLnKsk8ztUTqY3qanYiGpAO+I27OCZ3ADb4xjt1yKsWntsCK1ib008jtyKFv3z3rwRCZnY5a+gpKmvrIqOjgknqJnIyONjdXOVepC1aGCy7JqZtdckgu2ZSMRYKRPOioNU+E9et3/AO9JqH5JZsHo5Lfhr2V94e3cqb29nBna2Bq9CfhL0lfTzS1Ez5p5HyyvXec966q5e1VM5ib88NImK/qzMhvNyv8Adprpdqp9TVTLq5zur0InUnoNeAaMwAAAAAAAAAAbvAaZazOLHTImvOV8KeG+mp0byqKtKfZtFTa6Oqa6NiJ2oiOcvuKP2EUbq3avY2I3VI5nTO4a8GscvvRCzuV5XIlLYbajuKySzqnoREanvU5cvfNWHVj7YbS55AB1OVI9m1jXIMzt9A/zadsnPVL/AL2FnnPX1J7STUGcNk20vv8AIn+T6mdaR8evDyZfMRPVop5Yf/FzZffskc5I6y5r9S6Lh5ysXjK5OzgmhXacF1Qz2i0zv+jTeaxG36t/nFnlxfNK+2Mc5vks+9A/rVq+cx3qVCUbYmNvNvsGbwqjlulIkVYrU+DURoiO1709x8bR/wCMGE45mEa85M2JbdcF04pLH8BV72n3s6jflGCX3C2NWSsiVtyt7U6Ve3zXtTvRSN+0Wn0Tt3mser5xV6Y1snvd/c1G1l6k+pVIuujki03pXJ6OrvQ8diH+n7x/wSr+SfO2Sohpbha8Uo3otPY6JkEmnQtQvGR3frongfewxFdkF4a1Fcq2SqRETpXzUInvSZ90x2vEeyvyf7ApXptGpaLVVgroJaednU9isXVF9RCGUNc96MZR1DnL0IkSqq+wsjDLXU7P7XWZjkMK0dc+mfBaaOXzZXyPbpzit6UaiL19pe/l2Up5olDccvVRimYsudEu95LO5rmdUjNVRWr6FQslMbsmL3Sq2jNdFU2FI21FnhV2qy1D9USNU6fMXVfBPSUy9yver3Lq5y6qpYeUud+4Xh6by6eXVnDX8NSLx3hNJ7Sg1dXVVzu0twrZXS1FRLzkj16VVVJht2RE2hT7q6/wWn/VtINF9tZ+MhPduVNUP2gzvZBK5q0tPoqMVU+1NJnzR/z/ANIjyT/x/wBoAD2dS1LWq51PMiJ0qrFPEuonGG5PY/rXmxDLKWoktclR5TT1NNpztNLpuqui/CTTqMpNnlvvLJH4ZldDd5URXMopmLT1Dk7ER3BVNdUYe2q2f0WT2J1RWvZI+G6Qom8tO5OLXIiJruqnWppsXtl7rL/RwWamqfLuebzTmNVFYqL0qvUidpntzMS034iYa+oiq6CvfDOyWnqqeTRzXcHMci+xUUth1lp9p1NbMo5+OlnptIMherkTdYxuqTJ3tRU79CK7b6qjq9pFxko3xSI1I2TSR/BfK1iI9U8dTJ2bOemC50jXORPqfFqiL/vCLTM1iyaxEWmvo0u0XI25Ff1fSsWG2UcaUtBBrwjhbwb4r0qb/JE02D4ovbcav3qV2WNfYZ59hmKsghklX6o1aruNV2nH0EzG20Qis79U/wC8wrkybVRT3K50tvpmq6apmbFGiJ0ucqInvPxaKsRdFpJ0Xs5tSebGaZluqrxmFaxqRWKje+Jr0+FUOTSNO/XUtado3VrG87P3aRfvqRnVsobTJ/B8YZFTQK1eDnsXWR3ertU8DC202+GHL/qxRaLQ3qBlfAqJwTfTzk8Ha+shdVNJU1MtRM7ekler3r2qq6qWE1UybYo9HNWWvxipTdX4yU0q8e9EcnhoV26dpW36t4QzFPuptP8AbYflobzbPr+6nkOv/m19yGswWhrKzMbNFSU8kkjq2JybrehEeiqvcmirqZ+1+qjrNpuQTxPR7PLHsRyde75vzE/nR+RFAAXUAAAAAAAAAAAAAAAAAABfXJAnalfkVMqpvPigencivRflIbbldUsj8eslaieZHVPjdw63N1T5Klccm+8NtO1CjilerYq+J9K5deG8qbzfa1E8S/dvNilv2zS4w08fOT0yJUxoicfMXVUTw1ODJ9Goi0+rux/Vp5rHLjkAHe4W/s9rtEVKy53+4o2BeMdFSuR1ROmvb0Rpw6XcexD7v+V1dwoG2mhgitVnjXVtFTquj1++kd0vd6V9RHQRsncABKAAAAAAAAAAAAD9aiuVERFVV4IiAXDyULetRndbX/FpKJU6Ot7kT3Ipj8qe4rV7RoqJHasoqJjNPwnKrlX1KhYXJWsFTbMauVzraWWCWsqGtYkjVau4xOnRfS5SOZhsczPKs1ut5qKi30kFRUuWJXyq9ebRdG8Gp2Ihx9dfHmZniHZ0W8GIiOVDAvWHk6Vm5rUZbSRr2MpVcntch51fJ2uSMVaLKKGoXTgj4FZqvg5Tb+ox+7HwMnsp2su9xrLXR2yoqXPo6Le8ni0REZvLqpgE2y/ZZmeMxSVFZa1qKRnFaimckjUTtVE4p4oQk1rMTG8MrRMT3Z8N3uMNlns0dU5KCeRsskOiKivb0L2p4Cw3i5WK5x3K01T6WqjRUbI3TVEVNF6TABOyN3tXVVRXVk1ZVyulqJ5Fkle7pc5V1VV8TNxu/XXHbj9ULPVupancVm+jUXgvSnE1gGxumzdqudprpfXoummqQsRU9hFrxdbleKx1ZdK6orKh3S+Z6uXuTXoT0GECIrEcQmbTPMhnVN3uNRZqWzzVLn0NI974IVRNGOcurl7eJgglD9RVRUVOlCZR7UM5ZG2Nt9k3WtRrUWJi6InR1EMBExE8piZjhLLjtGzG4UE9DV3h8kE7FZI3mmJqi9WqJqRMARERwTMzy2WP368WCs8rs9wnpJeh3Nu4OTsVOhU7ze3DaXmlbSvpn3l8UciK1/MRsic5F6U1aiKRACaxPci0x2frlVzlc5VVVXVVXrMy33W4UFJWUlJUvigrY0iqGJppI1F10XxMIEoCT2HPcssVrjtlruz6ekjc5zI0ja5EVVVVXinpUjAImInlMTMcJp+6nnWv+nX/AJmP/CR6e/3ieirKKSuldT1tR5TUx8NJJPvlNYBFYjiCbTPMhn2i8XG0sqmUFS6FtXCsE6IiKj2L0oupgAlCUW7Pspt1jZZqG4JTUsbXMascLEkRF6U39N7r7SMOcrnK5yqrlXVVVeKn4CIiITMzIACUAAAAAAAAAAAAAAAAAAA9aOompKuGqp3qyaF7ZI3J1ORdUU7V2a5ZRZpilPcoXM57d5uqhReMcnWi+hertRTiUkuz3M7vhV6bcLY9Hxu0Seneq7kzexfT2L1GGfD4te3LfBm8O3wnm3HZRWWOvqL/AGCmfUWmZyySxMTV1Mqrx4dbPT1FPHZ+z7aLjea0aJSVLYK3d+y0U6oj0Xr0++T0p4mozjYziOSSSVVPE+01r/OWWlREa5e1zF4d+mimGPUzT6ckd2t9PF/qxuRwW/fuT/ltG9VtdZQXKL8ZYn+p3D2kOumzTO7dqs+M172oum9CznUX0+brwOquWluJc1sd68wiINlPYL7AqpPZblEqLou/SvT5jx+pV0/o2s/MO+gvvCuzDBnx2a8SLoy0171/Bp3r8xn0mG5bVqiU+NXeTXo0o36e4bwbS0IJ3QbItoVWq6Y9NAiJrrPIxnzkhtWwDM6lzVram20LF6VdKr3J4NTT2lJzUjmVoxXniFRg6Is/Jyo26OvGSzy9raWBGfpOVfcb79z7Y9ibecu0tG57ela+s3lVfxNURfUZzqqendrGmv69nL9JS1VZKkNJTTVEi9DImK5fUhO8a2PZ1elY9bV9T4Haay1j0j0Tt3fhewtqu2z7O8dgWnxy1PqHNRWtbS0rYY+jhxXRdPBSAZRt7yy5I6K0wU1piXVN5iLJIvivBPBB4mW3lrt+p0Yq+a2/6JbaNhOM2an8ty/IucYxNXta5IIk/KVdV6+w9pNoOyPCUWPGLNHXVTfNSSnh1175X8V8NSgL3e7ve6lam7XKqrZVXXemkV2ncnV09Rtdl9hfkmeWm1IzeifO18/m6okbfOdr6NE08ROKdt8ltyMsb7UjZ1lluTTWnZnVZK+FKapShSWOJztdyV6Jut9OiqnqOULvtCzW67yVmSXBzXdLY5ObT1N0Lm5WN/SnsttxuB+jqmRZ5mp94zg1F8V/ROcSulxx0dW3K2qyTN+nfhkT1tZP9vq6iX8eRV94p62tpnI6nq6iFUXVFjkVunqMcHU5VkYVtky+wVEbK2rdd6HXR8NSurtPwX9KL36oSPatiViyXEW7RsKiSONfOr6VifBX4yqnU5FXjpw04lKFy8l+7c5erpiVXrJRXOle/cXoR7U0X1tVfUhhkpFPrq3x26vospoGfkVvfab9X2x6LrS1D4uPWjXKiL6jAN2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+4ZZIZWywyPjkaurXMXRUXtRULExTbNm1ja2GWtZdKduic3VpvORPQ5OPr1K4BW1a2jaYWraazvEujbHyi7bIxrbzj9TA/givppUe3v0XRSTUe3XAJtOdq66mVf/EpXL8nU5MBhOkxy2jVZIdiU+2DZzPw+uFjNP/Ep5G/sn7Ptd2cxcVyGJ/4lPIv7Jx0Cv9HT3lb+rv7Q64qNt2zyFNWXKol7EjpH/Ohq63lA4bDGrqekulS/Xg1Imt96nLYJjSY4ROryOgrryjW6uS14y5U+K6pqdPWiIvvIteNvma1e82ijt9A1U01ZFvuTuVy/MVMDSunx14hSc+SeZSW8Z7mV2arK7I7g9iqq7rZdxOPoboRt7nPcrnuVzlXVVVdVU/AaxERwymZnkABKA6E5J+NJHT3HLKliJv8A8FplXsTRXuT2J4KUPZLbVXi70lroo1fUVUrYo2+lVOmtqFwpdmux6nx+2vRtVPD5JAqLoqronOSe1fFUOfUTvEUjmXRp4iJm88Qoba9ki5Vn1xubHa07XcxT9nNs4Iviuq+JEgDeIiI2hhMzM7yAAlAWJyc1kTa1a0Z0KyVH+hObd8+hXZa3JdoX1G0Z9cqaQUVHI+R69Cb2jU19a+pTPLO1JXxeeEU2vI1u07IUbpp5c/3kUNvmdd9U8tu1wR++2esle13a3eXT2aGoLVjasQrad5kABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABKtl+H1eaZVBbIUc2laqSVcyfycSLx49q9CETMVjeUxEzO0LR5L+HsYlRnF0a2OGJHR0aycETT4cmvYnFNe8rvbRmLsyzOeqid/k+l1gpG68Fai8Xd7l492havKAy+kxjGafAcdVsL3QIyfm9PsMH3vD4zvdr2nOZhhibz4k+vDfNMViMcenIADoc4AABeGPomz3YNWXiTRl3yNebp0VNHNjcnmrx48G7zuzihA9kGGS5llUcErVZbKXSatl6ERifF17V+lTM25ZfHlGV+TW9yJabY3yaka34LtOl+np00T0Ihjf67RT7ta/TWbfZX4ANmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABn2Cz3K/XWG2WqkkqqqZdGsYnrVV6kTtA/ces9wv13p7Va6d09VO7da1OrtVexE6VU6Sq57LsQ2ctpYXR1N8q0VU4prNLp8P0Rt4f/lU+LVQYzsQw91dcXx1l9qm/F035XdTGJ0tYnWvf6DnnMslumV32a73WZXyvXRjE+DE3qa1OpEOX/7z/j/Lp7YY/wAp/ZgXWvq7pcqi410zpqmokWSV7ulXKpigHU5gAADaYtYbnkt7gtFpp1mqZnadiMTrc5epEMnCsUvOXXdtus9MsjuCyyu4RxN7XL1fOWxe79YNkdhlxzFZI67Jp27tbX6IqRL2e3g1O9TO99p6a8tKU3jqnhj7RLzbdnWIJs+xmdslynbrdati+ciqnFuvaqdXUneUkelRNLUTvnnkfLLI5XPe9dVcq9KqvaeZNKdMIvfqkABdQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsLDZbtfa5tDaKCesqHfFjbrp3r0IneXTimxe12Kkbfdot0p4KeLznUjZNGdznpxXuQpfJWnK9Mdr8Ky2eYBf8ANa5I7dTrHRsciTVciaRs8etfQhddwumF7FLG+32qNlxyGaNN/eVFe5epXqnwW9Pmpx95GM821Q01Ctg2f0bKCjjbzaVaRo1dNP5Nmnm968Sk6meeqqH1FTM+aaRd573uVXOXtVVMum2Tz9o9mnXXH5e8+7Y5VkN2ya7y3S8Vb6iokXhqvmsT71qdSGqAOiI2YcgMm3UFbcaptLQUk1VM7gjImK5fYWbjexO+TU63DKa2mx6gam850z2ufp3a6J4qVteteZWrWbcKrY1z3tYxquc5dERE1VVLRwvZFWVFGl8zKrZj9mjRHu59UbK9voRfg+PH0G3XL9m+z5Oawy0/V66tbotxqV8xru1FVPkoiekrXMsyyHLazyi9XCSZqL9jhb5scfoRqcDPe9+O0L7Upz3TzMNp1vtVpdi+zejS10CebNXI3SWfhxVF6eP3y8ezRCpXuc97nvcrnOXVVVdVVT5BpWkVjspa025AAWVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuai2ebKq+mjfT7R0hlc1NWzPjTRevguilbXivK1azbhTILrfsXxqbRaLaVbFRejfaxV9kh+s2GWxy/6xLYqfgwtX/5DP8AqMfuv4N/ZSYL8pNg1g0Tn85jk7ebjY33uU3Nt2H4BTu3qzIKms4fBWpjYmvgmvtInU449Vo02SfRzUe1LS1NXKkVLTzTyL0NjYrl9SHWls2b7KrYiL5Dbp1RfhVNTznvdob+Wpx210fN2KsxygeiaIrnsa1Ozg1UUznV19IaRpJ9Zcy43sfzu9o17bT5DC7+UrHpHw7uLvYT+j2S4NiMLa/PMljqFbxWmY7m2u9GiLvu8NCTZFPLcGubcdslutsTumKhSONE7nb6u9pAK3E9krJ3S3LaRWVsruKuj0eq967qkRkvfmdv0iTopTiN/wBZbO97a7JYaF1p2fY/DBC1NG1EjNxuvajOlfFUKeyjJb5k1ctZe7jNVy/FR2iNYnY1qcE8Cy1j2C0Kojpb1cHt6dN9Gu9x+OznZNbXolp2eLVK3jzlWrV49XBVcXptWfprKl97ea0KighmnejIYnyvXoaxqqvsJJZNnuaXndWgx2tcxy6I+RnNt9btCbTbca2lY5mP4rZbWmmiKjFeunhukauu1nPrijmvv0tOxyaKynY2NPWia+003yTxGym2OOZ3SK37C76xnP5Fe7TZadE1c58qPcnhwT2mTHa9ieLqrq+8VmT1TOiOFFSJV9Ct0TTvVSpK+vrq+VZa6sqKqRV13ppVevrUxh0WnzW+3Y66x5Y+63q/bU630a2/Ccat9jp0TRHq1Hv79NNNe/UrbIsjvmQ1K1F6udTWv11TnHeanc1OCeCGqBauOteIUte1uZAAXVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD91XtU/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const INITIAL_WORKERS = [
  { id: "w1", name: "Avdyl Sylaj",  pin_code: "123456", role: "Owner", status: "active" },
  { id: "w2", name: "Lis Tahiri",   pin_code: "6969", role: "Worker", status: "active" },
  { id: "w3", name: "Eugen Sahiti", pin_code: "9565", role: "Worker", status: "active" },
];

const SERVICES = [
  { id: "s1", service_name: "Prerje", price: 10 },
  { id: "s2", service_name: "Mjeker", price: 5 },
  { id: "s3", service_name: "Prerje per femije", price: 10 },
  { id: "s4", service_name: "Ngjyrosja e mjekrres", price: 5 },
  { id: "s5", service_name: "Ngjyrosja e flokeve", price: 10 },
  { id: "s6", service_name: "Depilim me wax (dyll)", price: 5 },
  { id: "s7", service_name: "Depilim me Pe", price: 5 },
  { id: "s8", service_name: "Tretman", price: 30 },
  { id: "s9", service_name: "Prerje e flokeve, rregullimi i mjekrres me ngjyre, wax treatman", price: 50 },
];

const daysAgo = (days, hour = 10, min = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
};

const INITIAL_TRANSACTIONS = [
  { id: "t1", worker_id: "w2", service_id: "s1", total_price: 35, payment_method: "card", timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), is_locked: true },
  { id: "t2", worker_id: "w2", service_id: "s3", total_price: 18, payment_method: "cash", timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), is_locked: true },
  { id: "t3", worker_id: "w3", service_id: "s4", total_price: 48, payment_method: "card", timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), is_locked: true },
  { id: "t4", worker_id: "w3", service_id: "s2", total_price: 28, payment_method: "cash", timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),  is_locked: true },
];

const INITIAL_ARCHIVED_TRANSACTIONS = [
  { id:"a1",  worker_id:"w2", service_id:"s1", total_price:10, payment_method:"cash", timestamp:daysAgo(62,9,15),  is_locked:true },
  { id:"a2",  worker_id:"w3", service_id:"s8", total_price:30, payment_method:"card", timestamp:daysAgo(61,11,30), is_locked:true },
  { id:"a3",  worker_id:"w2", service_id:"s2", total_price:5,  payment_method:"cash", timestamp:daysAgo(60,14,0),  is_locked:true },
  { id:"a4",  worker_id:"w3", service_id:"s9", total_price:50, payment_method:"card", timestamp:daysAgo(59,16,45), is_locked:true },
  { id:"a5",  worker_id:"w2", service_id:"s5", total_price:10, payment_method:"cash", timestamp:daysAgo(58,10,0),  is_locked:true },
  { id:"a6",  worker_id:"w3", service_id:"s1", total_price:10, payment_method:"card", timestamp:daysAgo(35,9,0),   is_locked:true },
  { id:"a7",  worker_id:"w2", service_id:"s3", total_price:10, payment_method:"cash", timestamp:daysAgo(34,11,20), is_locked:true },
  { id:"a8",  worker_id:"w3", service_id:"s6", total_price:5,  payment_method:"card", timestamp:daysAgo(33,13,30), is_locked:true },
  { id:"a9",  worker_id:"w2", service_id:"s8", total_price:30, payment_method:"cash", timestamp:daysAgo(32,15,0),  is_locked:true },
  { id:"a10", worker_id:"w3", service_id:"s2", total_price:5,  payment_method:"card", timestamp:daysAgo(31,10,45), is_locked:true },
  { id:"a11", worker_id:"w2", service_id:"s9", total_price:50, payment_method:"card", timestamp:daysAgo(15,9,10),  is_locked:true },
  { id:"a12", worker_id:"w3", service_id:"s4", total_price:5,  payment_method:"cash", timestamp:daysAgo(14,12,0),  is_locked:true },
  { id:"a13", worker_id:"w2", service_id:"s1", total_price:10, payment_method:"cash", timestamp:daysAgo(13,10,30), is_locked:true },
  { id:"a14", worker_id:"w3", service_id:"s5", total_price:10, payment_method:"card", timestamp:daysAgo(12,14,0),  is_locked:true },
  { id:"a15", worker_id:"w2", service_id:"s7", total_price:5,  payment_method:"cash", timestamp:daysAgo(11,11,0),  is_locked:true },
];

const INITIAL_CORRECTIONS = [
  {
    id:"c1", transaction_id:"t1",
    original_data:{ service_id:"s2", total_price:28, payment_method:"cash" },
    modified_data: { service_id:"s1", total_price:35, payment_method:"card" },
    owner_id:"w1", reason:"Shërbim i gabuar i zgjedhur nga punonjësi",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

const TIME_LOGS = [
  { id:"tl1", worker_id:"w2", clock_in: new Date(Date.now()-3600000*6).toISOString(), clock_out:null },
  { id:"tl2", worker_id:"w3", clock_in: new Date(Date.now()-3600000*5).toISOString(), clock_out:null },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const fmt       = (n)   => `€${Number(n).toFixed(2)}`;
const fmtTime   = (iso) => new Date(iso).toLocaleTimeString("sq-AL", { hour:"2-digit", minute:"2-digit" });
const fmtDate   = (iso) => new Date(iso).toLocaleDateString("sq-AL", { month:"short", day:"numeric", year:"numeric" });
const fmtMonth  = (iso) => new Date(iso).toLocaleDateString("sq-AL", { month:"long", year:"numeric" });
const uid       = ()    => `id_${Math.random().toString(36).slice(2,9)}`;
const getService = (id) => SERVICES.find((s) => s.id === id);
const monthKey  = (iso) => iso.slice(0,7);

const PayBadge = ({ method }) => {
  if (!method) return <span style={{ color:"var(--text-3)", fontSize:11 }}>—</span>;
  const isCash = method === "cash";
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      background: isCash ? "rgba(76,175,122,0.1)" : "rgba(91,143,232,0.1)",
      border:`1px solid ${isCash ? "rgba(76,175,122,0.35)" : "rgba(91,143,232,0.35)"}`,
      color: isCash ? "var(--green)" : "var(--blue)",
      borderRadius:5, padding:"3px 8px", fontSize:11,
      fontFamily:"'Syne Mono',monospace", fontWeight:600,
    }}>
      {isCash ? "💵 KESH" : "💳 KARTË"}
    </span>
  );
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&family=Syne+Mono&family=Poppins:wght@400;500;600;700&display=swap');
    :root {
      --gold:#C9A84C; --gold-light:#E8C96A; --gold-dim:#8A6E2F;
      --ink:#0C0C0E; --ink-2:#141416; --ink-3:#1C1C20; --ink-4:#252528; --ink-5:#2F2F34;
      --muted:#5A5A62; --muted-2:#3A3A40;
      --text:#E8E8EC; --text-2:#A8A8B0; --text-3:#6A6A72;
      --red:#E05555; --green:#4CAF7A; --blue:#5B8FE8; --purple:#9B72E8;
      --nav-h:56px;
    }
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body,#root{height:100%;overscroll-behavior:none;}
    body{background:var(--ink);color:var(--text);font-family:'Syne',sans-serif;-webkit-font-smoothing:antialiased;}
    .font-display{font-family:'Cormorant Garamond',serif;}
    .font-mono{font-family:'Syne Mono',monospace;}
    ::-webkit-scrollbar{width:3px;}
    ::-webkit-scrollbar-track{background:var(--ink-3);}
    ::-webkit-scrollbar-thumb{background:var(--gold-dim);border-radius:2px;}

    @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
    .gold-shimmer{background:linear-gradient(90deg,var(--gold-dim) 0%,var(--gold-light) 40%,var(--gold-dim) 60%,var(--gold) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
    .fade-up{animation:fadeUp 0.35s ease both;}
    @keyframes pinPop{0%{transform:scale(0.5);}60%{transform:scale(1.3);}100%{transform:scale(1);}}
    .pin-pop{animation:pinPop 0.2s ease;}
    @keyframes shake{0%,100%{transform:translateX(0);}20%{transform:translateX(-6px);}40%{transform:translateX(6px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}}
    .shake{animation:shake 0.35s ease;}
    @keyframes pulse-gold{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0.3);}50%{box-shadow:0 0 0 8px rgba(201,168,76,0);}}
    .pulse-gold{animation:pulse-gold 2s ease-in-out infinite;}
    @keyframes ticker{from{opacity:0;transform:translateY(-4px);}to{opacity:1;transform:translateY(0);}}
    .ticker{animation:ticker 0.2s ease;}
    @keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
    .slide-down{animation:slideDown 0.25s ease both;}
    @keyframes drawerIn{from{transform:translateX(100%);}to{transform:translateX(0);}}
    @keyframes drawerOut{from{transform:translateX(0);}to{transform:translateX(100%);}}}
    @keyframes overlayIn{from{opacity:0;}to{opacity:1;}}
    @keyframes toastIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}

    .tr-hover:hover{background:var(--ink-4) !important;}
    .badge-locked{background:rgba(201,168,76,0.12);border:1px solid var(--gold-dim);color:var(--gold);font-family:'Syne Mono',monospace;font-size:10px;padding:2px 7px;border-radius:3px;white-space:nowrap;}
    .badge-archive{background:rgba(155,114,232,0.12);border:1px solid rgba(155,114,232,0.4);color:var(--purple);font-family:'Syne Mono',monospace;font-size:10px;padding:2px 7px;border-radius:3px;white-space:nowrap;}
    .glass-card{background:linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%);border:1px solid rgba(201,168,76,0.15);backdrop-filter:blur(8px);}
    .gold-line{height:1px;background:linear-gradient(90deg,transparent,var(--gold-dim),transparent);}
    .btn-gold{position:relative;overflow:hidden;transition:all 0.2s;}
    .btn-gold:active{transform:scale(0.97);}
    .month-row:hover{background:rgba(201,168,76,0.04);}
    .reset-toast{position:fixed;bottom:24px;right:16px;z-index:9999;background:linear-gradient(135deg,var(--ink-3),var(--ink-4));border:1px solid var(--gold-dim);border-radius:10px;padding:14px 18px;display:flex;align-items:center;gap:12px;box-shadow:0 8px 32px rgba(0,0,0,0.6);animation:toastIn 0.3s ease both;max-width:calc(100vw - 32px);}

    /* ── mobile table scroll ── */
    .table-wrap{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;}
    table{min-width:520px;}

    /* ── worker bottom nav ── */
    .worker-bottom-nav{
      background:var(--ink-2);
      border-top:1px solid rgba(201,168,76,0.2);
      display:flex;
      flex-shrink:0;
      z-index:40;
      padding-bottom:env(safe-area-inset-bottom);
    }
    .worker-bottom-nav button{
      flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:5px;padding:12px 4px;background:none;border:none;cursor:pointer;
      font-family:'Syne',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.05em;
      text-transform:uppercase;color:var(--text-3);transition:color 0.2s;
    }
    .worker-bottom-nav button.active{color:var(--gold);}
    .worker-bottom-nav button .nav-icon{font-size:22px;line-height:1;}

    /* ── page padding ── */
    .page-with-bottom-nav{padding-bottom:16px;}

    /* ── responsive grid helpers ── */
    .stats-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
    .stats-grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
    @media(max-width:700px){
      .stats-grid-4{grid-template-columns:repeat(2,1fr);}
      .stats-grid-2{grid-template-columns:repeat(2,1fr);}
    }
    @media(max-width:400px){
      .stats-grid-4{grid-template-columns:repeat(2,1fr);}
    }
    .two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
    @media(max-width:640px){.two-col{grid-template-columns:1fr;}}

    /* ── service grid ── */
    .service-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;}
    @media(max-width:480px){.service-grid{grid-template-columns:repeat(2,1fr);}}

    /* ── staff grid ── */
    .staff-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
    @media(max-width:600px){.staff-grid{grid-template-columns:1fr;}}

    /* ── compact top nav on mobile ── */
    @media(max-width:520px){
      :root{ --nav-h:46px; }
      .nav-logo-box{ width:22px !important; height:22px !important; font-size:11px !important; border-radius:5px !important; }
      .nav-logo-text{ font-size:14px !important; letter-spacing:0.5px !important; }
      .nav-hamburger{ padding:6px 9px !important; border-radius:7px !important; }
      .nav-view-label{ font-size:9px !important; padding:3px 0 4px !important; }
      .nav-safe-top{ padding-top:0 !important; }
    }

    /* ── archive table → cards on mobile ── */
    @media(max-width:540px){
      .archive-table{ display:block !important; }
      .archive-table thead{ display:none !important; }
      .archive-table tbody{ display:block !important; }
      .archive-table tfoot{ display:block !important; }
      .archive-table tbody tr{
        display:grid !important;
        grid-template-columns:1fr auto !important;
        grid-template-rows:auto auto auto !important;
        padding:10px 12px !important;
        gap:3px 8px !important;
        background:var(--ink-2) !important;
        border-bottom:1px solid rgba(255,255,255,0.05) !important;
      }
      .archive-table tbody tr:nth-child(even){ background:var(--ink-3) !important; }
      .archive-table td{ display:block !important; padding:0 !important; border:none !important; }
      .archive-table td.col-datetime{ grid-column:1; grid-row:1; }
      .archive-table td.col-worker  { grid-column:1; grid-row:2; font-size:13px !important; font-weight:600; }
      .archive-table td.col-service { grid-column:1/3; grid-row:3; font-size:11px !important; color:var(--text-3) !important; padding-top:3px !important; }
      .archive-table td.col-price   { grid-column:2; grid-row:1; text-align:right; }
      .archive-table td.col-pay     { grid-column:2; grid-row:2; display:flex !important; justify-content:flex-end; }
      .archive-table tfoot tr{ display:flex !important; align-items:center !important; padding:10px 12px !important; }
      .archive-table tfoot td{ display:block !important; padding:0 !important; }
      .archive-table tfoot td:first-child{ flex:1 !important; }
    }
  `}</style>
);

// ─── HAMBURGER ICON ───────────────────────────────────────────────────────────
function HamburgerIcon({ open }) {
  return (
    <div style={{ width:22, height:16, position:"relative", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
      {[0,1,2].map((i) => (
        <span key={i} style={{
          display:"block", height:2, borderRadius:2,
          background:"var(--gold)",
          transition:"all 0.25s ease",
          transformOrigin: i === 0 ? "top left" : i === 2 ? "bottom left" : "center",
          transform: open
            ? i === 0 ? "rotate(45deg) translate(1px,-1px)"
            : i === 2 ? "rotate(-45deg) translate(1px,1px)"
            : "scaleX(0)"
            : "none",
          opacity: open && i === 1 ? 0 : 1,
        }} />
      ))}
    </div>
  );
}

// ─── DRAWER MENU (Owner only) ─────────────────────────────────────────────────
const OWNER_NAV = [
  { id:"dashboard",    label:"Paneli",           icon:"📊" },
  { id:"transactions", label:"Transaksionet",    icon:"💳" },
  { id:"corrections",  label:"Korrigjimet",      icon:"✏️" },
  { id:"archive",      label:"Arkiva",           icon:"📦" },
  { id:"staff",        label:"Stafi",            icon:"👥" },
];

function DrawerMenu({ open, onClose, view, setView, user, onLogout }) {
  // close on back-swipe / escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id) => { setView(id); onClose(); };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:"fixed", inset:0, zIndex:200,
          background:"rgba(0,0,0,0.6)",
          backdropFilter:"blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition:"opacity 0.3s ease",
        }}
      />

      {/* Drawer panel */}
      <div style={{
        position:"fixed", top:0, right:0, bottom:0,
        width: Math.min(300, window.innerWidth * 0.82),
        background:"var(--ink-2)",
        borderLeft:"1px solid rgba(201,168,76,0.2)",
        zIndex:201,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition:"transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        display:"flex", flexDirection:"column",
        paddingTop:"env(safe-area-inset-top)",
      }}>

        {/* Drawer header */}
        <div style={{
          padding:"20px 20px 16px",
          borderBottom:"1px solid rgba(201,168,76,0.15)",
          display:"flex", alignItems:"center", gap:12,
        }}>
          <div style={{
            width:40, height:40, borderRadius:"50%",
            background:"linear-gradient(135deg,var(--gold-dim),var(--gold))",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:18, fontWeight:700, color:"var(--ink)", flexShrink:0,
          }}>
            {user?.name?.[0]}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"var(--text)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.name}</div>
            <div style={{ fontSize:10, color:"var(--gold)", letterSpacing:"0.1em" }}>PRONAR</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"var(--text-3)", fontSize:20, cursor:"pointer", padding:"4px", flexShrink:0 }}>✕</button>
        </div>

        {/* Nav items */}
        <div style={{ flex:1, overflowY:"auto", padding:"12px 0" }}>
          {OWNER_NAV.map((item) => {
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                style={{
                  width:"100%", display:"flex", alignItems:"center", gap:14,
                  padding:"14px 20px", background:"none", border:"none",
                  borderLeft: isActive ? "3px solid var(--gold)" : "3px solid transparent",
                  background: isActive ? "rgba(201,168,76,0.07)" : "none",
                  cursor:"pointer", transition:"all 0.15s",
                  textAlign:"left",
                }}
              >
                <span style={{ fontSize:20, width:28, textAlign:"center", flexShrink:0 }}>{item.icon}</span>
                <span style={{
                  fontSize:13, fontWeight:600, letterSpacing:"0.05em",
                  color: isActive ? "var(--gold)" : "var(--text-2)",
                  fontFamily:"'Syne',sans-serif",
                  textTransform:"uppercase",
                }}>
                  {item.label}
                </span>
                {isActive && <span style={{ marginLeft:"auto", color:"var(--gold)", fontSize:12 }}>●</span>}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)", margin:"0 16px" }} />

        {/* Logout */}
        <div style={{ padding:"16px 20px", paddingBottom:"calc(16px + env(safe-area-inset-bottom))" }}>
          <button
            onClick={() => { onLogout(); onClose(); }}
            style={{
              width:"100%", display:"flex", alignItems:"center", gap:14,
              padding:"14px 16px", borderRadius:10,
              background:"rgba(224,85,85,0.08)",
              border:"1px solid rgba(224,85,85,0.25)",
              cursor:"pointer", transition:"all 0.15s",
            }}
          >
            <span style={{ fontSize:20 }}>🚪</span>
            <span style={{ fontSize:13, fontWeight:700, color:"var(--red)", fontFamily:"'Syne',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Dil nga llogaria
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

// ─── TOP NAV ──────────────────────────────────────────────────────────────────
function TopNav({ user, onLogout, view, setView }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isOwner = user?.role === "Owner";

  return (
    <>
      <nav className="nav-safe-top" style={{
        background:"var(--ink-2)",
        borderBottom:"1px solid rgba(201,168,76,0.2)",
        position:"sticky", top:0, zIndex:50,
        paddingTop:"env(safe-area-inset-top)",
      }}>
        <div style={{
          maxWidth:1200, margin:"0 auto",
          padding:"0 16px",
          display:"flex", alignItems:"center",
          height:"var(--nav-h)",
          gap:12,
        }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <img src={LOGO_B64} alt="AS Hair Salon" className="nav-logo-box" style={{ width:34, height:34, borderRadius:8, objectFit:"cover", mixBlendMode:"screen" }} />
            <span className="font-display gold-shimmer nav-logo-text" style={{ fontSize:17, fontWeight:700, letterSpacing:1 }}>AS Hair Salon</span>
          </div>

          <div style={{ flex:1 }} />

          {/* Owner: hamburger only */}
          {isOwner && (
            <button
              className="nav-hamburger"
              onClick={() => setDrawerOpen(true)}
              style={{
                background:"rgba(201,168,76,0.08)",
                border:"1px solid rgba(201,168,76,0.25)",
                borderRadius:8,
                padding:"9px 12px",
                cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}
              aria-label="Open menu"
            >
              <HamburgerIcon open={false} />
            </button>
          )}

          {/* Worker: just show name + logout inline (small) */}
          {!isOwner && (
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12, fontWeight:600, color:"var(--text)" }}>{user?.name?.split(" ")[0]}</div>
                <div style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em" }}>PUNONJËS</div>
              </div>
            </div>
          )}
        </div>

        {/* Owner: active view label under nav */}
        {isOwner && (
          <div className="nav-view-label" style={{
            textAlign:"center",
            padding:"4px 0 6px",
            fontSize:10, letterSpacing:"0.15em", color:"var(--gold)",
            textTransform:"uppercase", fontWeight:600,
            borderTop:"1px solid rgba(201,168,76,0.08)",
          }}>
            {OWNER_NAV.find(n => n.id === view)?.icon} {OWNER_NAV.find(n => n.id === view)?.label}
          </div>
        )}
      </nav>

      {/* Drawer */}
      {isOwner && (
        <DrawerMenu
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          view={view}
          setView={setView}
          user={user}
          onLogout={onLogout}
        />
      )}
    </>
  );
}

// ─── WORKER BOTTOM NAV ────────────────────────────────────────────────────────
function WorkerBottomNav({ view, setView, onLogout }) {
  return (
    <nav className="worker-bottom-nav">
      <button className={view === "log" ? "active" : ""} onClick={() => setView("log")}>
        <span className="nav-icon">✂️</span>
        Regjistro
      </button>
      <button className={view === "history" ? "active" : ""} onClick={() => setView("history")}>
        <span className="nav-icon">📋</span>
        Historia
      </button>
      <button onClick={onLogout} style={{ color:"var(--red) !important" }}>
        <span className="nav-icon">🚪</span>
        <span style={{ color:"var(--red)" }}>Dal</span>
      </button>
    </nav>
  );
}

// ─── PIN LOGIN ────────────────────────────────────────────────────────────────
function PinLogin({ onLogin, workers }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleDigit = (d) => {
    if (pin.length >= 6) return;
    const next = pin + d;
    setPin(next);
    // At 4 digits: try workers only (not Owner)
    if (next.length === 4) {
      const worker = workers.find((w) => w.pin_code === next && w.status === "active" && w.role !== "Owner");
      if (worker) setTimeout(() => attempt(next), 120);
    }
    // At 6 digits: try everyone (owner)
    if (next.length === 6) setTimeout(() => attempt(next), 120);
  };

  const attempt = (p) => {
    const worker = workers.find((w) => w.pin_code === p && w.status === "active");
    if (worker) {
      onLogin(worker);
    } else {
      setError(true);
      setShakeKey((k) => k + 1);
      setTimeout(() => { setPin(""); setError(false); }, 800);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
      else if (e.key === "Backspace") setPin((p) => p.slice(0,-1));
      else if (e.key === "Enter") setPin((p) => { if (p.length >= 4) attempt(p); return p; });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pin]);

  const pad = [["1","2","3"],["4","5","6"],["7","8","9"],["←","0","✓"]];

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"var(--ink)",
      backgroundImage:"radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.06) 0%,transparent 70%)",
      padding:"20px",
    }}>
      <div className="fade-up glass-card" style={{
        padding:"40px 28px", borderRadius:20,
        width:"100%", maxWidth:340,
        display:"flex", flexDirection:"column", alignItems:"center", gap:28,
      }}>
          <div style={{ textAlign:"center" }}>
          <img src={LOGO_B64} alt="AS Hair Salon" style={{ width:120, height:120, borderRadius:16, objectFit:"cover", marginBottom:12, mixBlendMode:"screen" }} />
          <h1 className="font-display gold-shimmer" style={{ fontSize:30, fontWeight:700, letterSpacing:2 }}>AS Hair Salon</h1>
          <p style={{ color:"var(--text-3)", fontSize:11, letterSpacing:"0.15em", marginTop:4 }}>OPERACIONET E BRENDSHME</p>
        </div>
        <div className="gold-line" style={{ width:"100%" }} />
        <div>
          <p style={{ color:"var(--text-3)", fontSize:11, letterSpacing:"0.12em", textAlign:"center", marginBottom:20 }}>VENDOS KODIN PIN</p>
          <div key={shakeKey} className={error ? "shake" : ""} style={{ display:"flex", gap:16, justifyContent:"center" }}>
            {Array.from({ length:6 }, (_,i) => (
              <div key={i} className={pin.length > i ? "pin-pop" : ""} style={{
                width:16, height:16, borderRadius:"50%",
                background: error ? "var(--red)" : pin.length > i ? "var(--gold)" : "var(--ink-5)",
                border:`1px solid ${error ? "var(--red)" : pin.length > i ? "var(--gold)" : "var(--muted-2)"}`,
                transition:"all 0.15s",
              }} />
            ))}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,64px)", gap:10, justifyContent:"center" }}>
          {pad.flat().map((d) => (
            <button key={d}
              onClick={() => {
                if (d === "←") setPin((p) => p.slice(0,-1));
                else if (d === "✓") attempt(pin);
                else handleDigit(d);
              }}
              style={{
                background: d === "✓" ? "rgba(201,168,76,0.15)" : "var(--ink-4)",
                border:`1px solid ${d === "✓" ? "var(--gold-dim)" : "var(--ink-5)"}`,
                borderRadius:10, width:64, height:64,
                display:"flex", alignItems:"center", justifyContent:"center",
                color: d === "✓" ? "var(--gold)" : "var(--text)",
                fontSize:22, lineHeight:1, padding:0,
                cursor:"pointer", fontFamily:"'Poppins',sans-serif", fontWeight:600,
                transition:"all 0.15s", touchAction:"manipulation",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = d === "✓" ? "rgba(201,168,76,0.22)" : "var(--ink-5)"}
              onMouseLeave={(e) => e.currentTarget.style.background = d === "✓" ? "rgba(201,168,76,0.15)" : "var(--ink-4)"}
            >{d}</button>
          ))}
        </div>
    
      </div>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent="var(--gold)", icon }) {
  return (
    <div className="glass-card fade-up" style={{ borderRadius:10, padding:"14px 16px", display:"flex", flexDirection:"column", gap:5 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <span style={{ fontSize:9, letterSpacing:"0.12em", color:"var(--text-3)", textTransform:"uppercase", lineHeight:1.4 }}>{label}</span>
        {icon && <span style={{ fontSize:16 }}>{icon}</span>}
      </div>
      <div className="ticker" style={{ fontSize:22, fontWeight:800, color:accent, fontFamily:"'Syne',sans-serif" }}>{value}</div>
      {sub && <div style={{ fontSize:10, color:"var(--text-3)" }}>{sub}</div>}
    </div>
  );
}

// ─── RESET TOAST ──────────────────────────────────────────────────────────────
function ResetToast({ onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="reset-toast">
      <div style={{ fontSize:22 }}>📦</div>
      <div>
        <div style={{ fontSize:13, fontWeight:700, color:"var(--gold)" }}>Rifreskim i Natës</div>
        <div style={{ fontSize:11, color:"var(--text-3)", marginTop:2 }}>Transaksionet e sotme u arkivuan.</div>
      </div>
      <button onClick={onDismiss} style={{ background:"none", border:"none", color:"var(--text-3)", cursor:"pointer", fontSize:16, padding:"0 4px", marginLeft:4 }}>×</button>
    </div>
  );
}

// ─── WORKER: LOG SERVICE ──────────────────────────────────────────────────────
function WorkerLogService({ user, transactions, setTransactions }) {
  const [selected, setSelected] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const service = SERVICES.find((s) => s.id === selected);
  const canSubmit = selected && paymentMethod;

  const confirmSubmit = () => {
    const svc = SERVICES.find((s) => s.id === selected);
    setTransactions((prev) => [...prev, {
      id:uid(), worker_id:user.id, service_id:selected,
      total_price:svc.price, payment_method:paymentMethod,
      timestamp:new Date().toISOString(), is_locked:true,
    }]);
    setSubmitted(true);
    setConfirmOpen(false);
    setTimeout(() => { setSubmitted(false); setSelected(null); setPaymentMethod(null); }, 2500);
  };

  return (
    <div style={{ maxWidth:760, margin:"0 auto", padding:"24px 16px" }} className="page-with-bottom-nav">
      <div style={{ marginBottom:22 }}>
        <h2 className="font-display" style={{ fontSize:26, fontWeight:600 }}>Regjistro Shërbim</h2>
        <p style={{ color:"var(--text-3)", fontSize:12, marginTop:4 }}>
          Zgjidh shërbimin &amp; mënyrën e pagesës. Pas dorëzimit, rekordi është <span style={{ color:"var(--gold)" }}>i bllokuar</span>.
        </p>
      </div>

      {/* Service grid */}
      <div className="service-grid" style={{ marginBottom:20 }}>
        {SERVICES.map((s) => (
          <div key={s.id} onClick={() => !submitted && setSelected(s.id)} style={{
            borderRadius:10, padding:"12px 14px", position:"relative",
            border:`1px solid ${selected === s.id ? "var(--gold)" : "rgba(201,168,76,0.12)"}`,
            background: selected === s.id ? "rgba(201,168,76,0.07)" : "var(--ink-3)",
            cursor: submitted ? "not-allowed" : "pointer",
            transition:"all 0.18s", opacity: submitted ? 0.5 : 1,
            touchAction:"manipulation",
          }}>
            {selected === s.id && <span style={{ position:"absolute", top:7, right:10, color:"var(--gold)", fontSize:12 }}>✓</span>}
            <div style={{ fontWeight:600, fontSize:12, color:"var(--text)", marginBottom:5, lineHeight:1.3 }}>{s.service_name}</div>
            <span className="font-mono" style={{ color:"var(--gold)", fontSize:14, fontWeight:600 }}>{fmt(s.price)}</span>
          </div>
        ))}
      </div>

      {/* Payment method */}
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:10, color:"var(--text-3)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:10 }}>
          Mënyra e Pagesës <span style={{ color:"var(--red)" }}>*</span>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {[
            { id:"cash", label:"Kesh",  icon:"💵", color:"var(--green)", bg:"rgba(76,175,122,0.1)",  border:"rgba(76,175,122,0.4)" },
            { id:"card", label:"Kartë", icon:"💳", color:"var(--blue)",  bg:"rgba(91,143,232,0.1)", border:"rgba(91,143,232,0.4)" },
          ].map((pm) => {
            const isActive = paymentMethod === pm.id;
            return (
              <button key={pm.id} onClick={() => !submitted && setPaymentMethod(pm.id)} style={{
                flex:1, padding:"16px 12px", borderRadius:12,
                background: isActive ? pm.bg : "var(--ink-3)",
                border:`2px solid ${isActive ? pm.border : "rgba(255,255,255,0.06)"}`,
                cursor: submitted ? "not-allowed" : "pointer",
                display:"flex", flexDirection:"column", alignItems:"center", gap:6,
                transition:"all 0.18s", opacity: submitted ? 0.5 : 1,
                boxShadow: isActive ? `0 0 18px ${pm.bg}` : "none",
                touchAction:"manipulation",
              }}>
                <span style={{ fontSize:26 }}>{pm.icon}</span>
                <span style={{ fontSize:13, fontWeight:700, letterSpacing:"0.06em", color: isActive ? pm.color : "var(--text-2)", fontFamily:"'Syne',sans-serif" }}>{pm.label}</span>
                {isActive && <span style={{ width:18, height:18, borderRadius:"50%", background:pm.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"var(--ink)", fontWeight:700 }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price preview */}
      {service && (
        <div className="fade-up glass-card" style={{ borderRadius:9, padding:"14px 18px", marginBottom:18 }}>
          <div style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em", marginBottom:4 }}>ÇMIMI I SHËRBIMIT</div>
          <div className="font-mono" style={{ color:"var(--gold)", fontSize:22 }}>{fmt(service.price)}</div>
        </div>
      )}

      {submitted ? (
        <div className="fade-up" style={{ background:"rgba(76,175,122,0.1)", border:"1px solid var(--green)", borderRadius:10, padding:"16px 18px", display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:20 }}>🔒</span>
          <div>
            <div style={{ color:"var(--green)", fontWeight:600, fontSize:14 }}>Transaksioni u Bllokua &amp; u Ruajt</div>
            <div style={{ color:"var(--text-3)", fontSize:12, marginTop:2 }}>Kontakto pronarin për korrigjime.</div>
          </div>
        </div>
      ) : (
        <button className="btn-gold pulse-gold" onClick={() => canSubmit && setConfirmOpen(true)} disabled={!canSubmit} style={{
          width:"100%",
          background: canSubmit ? "linear-gradient(135deg,var(--gold-dim),var(--gold))" : "var(--ink-4)",
          border:"none", borderRadius:12,
          color: canSubmit ? "var(--ink)" : "var(--muted)",
          padding:"16px", fontSize:13, fontWeight:700, letterSpacing:"0.08em",
          cursor: canSubmit ? "pointer" : "not-allowed",
          fontFamily:"'Syne',sans-serif", transition:"all 0.2s",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
          touchAction:"manipulation",
        }}>
          <span>🔒</span> BLLOKO &amp; DËRGO
          {!selected && <span style={{ fontSize:11, fontWeight:400, opacity:0.6 }}>— zgjidh shërbimin</span>}
          {selected && !paymentMethod && <span style={{ fontSize:11, fontWeight:400, opacity:0.6 }}>— zgjidh pagesën</span>}
        </button>
      )}

      {/* Confirm modal */}
      {confirmOpen && service && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center", padding:"0 0 calc(var(--nav-h) + env(safe-area-inset-bottom))" }}>
          <div className="fade-up glass-card" style={{ borderRadius:"20px 20px 0 0", padding:"24px 20px", width:"100%", maxWidth:480, maxHeight:"80dvh", overflowY:"auto" }}>
            <div style={{ width:40, height:4, borderRadius:2, background:"var(--muted-2)", margin:"0 auto 20px" }} />
            <h3 className="font-display" style={{ fontSize:22, marginBottom:8 }}>Konfirmo Transaksionin</h3>
            <p style={{ color:"var(--text-3)", fontSize:13, marginBottom:18 }}>
              Ky rekor do të <strong style={{ color:"var(--gold)" }}>bllokohet përgjithmonë</strong> pas dorëzimit.
            </p>
            <div style={{ background:"var(--ink-4)", borderRadius:10, padding:"14px 16px", marginBottom:18, display:"flex", flexDirection:"column", gap:10 }}>
              {[["Shërbimi", service.service_name, "var(--text)"], ["Çmimi Total", fmt(service.price), "var(--gold)"]].map(([l,v,c]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:"var(--text-2)", fontSize:13 }}>{l}</span>
                  <span style={{ color:c, fontSize:13, fontWeight:600 }}>{v}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:"var(--text-2)", fontSize:13 }}>Pagesa</span>
                <PayBadge method={paymentMethod} />
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setConfirmOpen(false)} style={{ flex:1, background:"var(--ink-4)", border:"1px solid var(--ink-5)", borderRadius:10, color:"var(--text-2)", padding:"14px", fontSize:13, cursor:"pointer", fontFamily:"'Syne',sans-serif", touchAction:"manipulation" }}>Anulo</button>
              <button onClick={confirmSubmit} style={{ flex:1, background:"linear-gradient(135deg,var(--gold-dim),var(--gold))", border:"none", borderRadius:10, color:"var(--ink)", padding:"14px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Syne',sans-serif", touchAction:"manipulation" }}>Blloko &amp; Dërgo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WORKER: MY HISTORY ───────────────────────────────────────────────────────
function WorkerHistory({ user, transactions }) {
  const mine = transactions.filter((t) => t.worker_id === user.id).sort((a,b) => new Date(b.timestamp)-new Date(a.timestamp));
  const todayTotal = mine.filter((t) => new Date(t.timestamp).toDateString() === new Date().toDateString()).reduce((s,t) => s+t.total_price, 0);
  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 16px" }} className="page-with-bottom-nav">
      <div style={{ marginBottom:20 }}>
        <h2 className="font-display" style={{ fontSize:26, fontWeight:600 }}>Transaksionet e Mia</h2>
        <p style={{ color:"var(--text-3)", fontSize:12, marginTop:4 }}>Kontakto pronarin për korrigjime</p>
      </div>
      <div className="stats-grid-2" style={{ marginBottom:20 }}>
        <StatCard label="Të Ardhurat Sot" value={fmt(todayTotal)} icon="💈" />
        <StatCard label="Shërbime Totale" value={mine.length} sub="gjithë kohën" accent="var(--blue)" icon="📋" />
      </div>
      <div className="table-wrap" style={{ borderRadius:10, border:"1px solid rgba(201,168,76,0.12)", overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"480px" }}>
          <thead>
            <tr style={{ background:"var(--ink-3)", borderBottom:"1px solid rgba(201,168,76,0.2)" }}>
              {["Ora","Shërbimi","Çmimi","Pagesa","Statusi"].map((h) => (
                <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:9, letterSpacing:"0.12em", color:"var(--text-3)", textTransform:"uppercase", fontWeight:600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mine.map((tx,i) => {
              const svc = getService(tx.service_id);
              return (
                <tr key={tx.id} className="tr-hover" style={{ background: i%2===0 ? "var(--ink-2)" : "var(--ink-3)", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding:"11px 14px" }}>
                    <div className="font-mono" style={{ fontSize:11, color:"var(--text)" }}>{fmtTime(tx.timestamp)}</div>
                    <div style={{ fontSize:9, color:"var(--text-3)", marginTop:2 }}>{fmtDate(tx.timestamp)}</div>
                  </td>
                  <td style={{ padding:"11px 14px", fontSize:12, color:"var(--text)", fontWeight:500 }}>{svc?.service_name ?? "—"}</td>
                  <td style={{ padding:"11px 14px" }}><span className="font-mono" style={{ color:"var(--gold)", fontSize:13 }}>{fmt(tx.total_price)}</span></td>
                  <td style={{ padding:"11px 14px" }}><PayBadge method={tx.payment_method} /></td>
                  <td style={{ padding:"11px 14px" }}><span className="badge-locked">🔒 BLLOKUAR</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {mine.length === 0 && <div style={{ padding:"40px", textAlign:"center", color:"var(--text-3)" }}>Ende nuk ka transaksione</div>}
      </div>
    </div>
  );
}

// ─── OWNER: DASHBOARD ─────────────────────────────────────────────────────────
function OwnerDashboard({ transactions, corrections, workers }) {
  const today = transactions.filter((t) => new Date(t.timestamp).toDateString() === new Date().toDateString());
  const totalRevToday = today.reduce((s,t) => s+t.total_price, 0);
  const totalRev = transactions.reduce((s,t) => s+t.total_price, 0);
  const cashRev = today.filter((t) => t.payment_method==="cash").reduce((s,t) => s+t.total_price, 0);
  const cardRev = today.filter((t) => t.payment_method==="card").reduce((s,t) => s+t.total_price, 0);
  const cashPct = totalRevToday > 0 ? (cashRev/totalRevToday)*100 : 0;
  const cardPct = totalRevToday > 0 ? (cardRev/totalRevToday)*100 : 0;
  const correctionRate = transactions.length > 0 ? ((corrections.length/transactions.length)*100).toFixed(1) : 0;

  const flags = [];
  corrections.forEach((c) => {
    const tx = transactions.find((t) => t.id === c.transaction_id);
    if (tx) {
      const mins = Math.abs(new Date(c.timestamp)-new Date(tx.timestamp))/60000;
      if (mins > 60) flags.push({ type:"late-correction", detail:`Korrigjuar ${mins.toFixed(0)} min pas regjistrimit` });
    }
  });
  if (parseFloat(correctionRate) > 10) flags.push({ type:"high-correction-rate", detail:`${correctionRate}% normë korrigjimi është mbi pragun` });

  const workerBreakdown = workers.filter((w) => w.role==="Worker").map((w) => {
    const wTx = today.filter((t) => t.worker_id===w.id);
    return { ...w, count:wTx.length, revenue:wTx.reduce((s,t) => s+t.total_price, 0) };
  });

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>
      <div style={{ marginBottom:20 }}>
        <h2 className="font-display" style={{ fontSize:26, fontWeight:600 }}>Paneli i Pronarit</h2>
        <p style={{ color:"var(--text-3)", fontSize:12, marginTop:4 }}>Pasqyrë e operacioneve në kohë reale</p>
      </div>
      <div className="stats-grid-4" style={{ marginBottom:20 }}>
        <StatCard label="Të Ardhurat Sot"   value={fmt(totalRevToday)} icon="💰" />
        <StatCard label="Të Ardhura Totale" value={fmt(totalRev)} accent="var(--blue)" icon="📊" />
        <StatCard label="Korrigjimet"       value={corrections.length} accent={corrections.length>2?"var(--red)":"var(--gold)"} icon="✏️" />
        <StatCard label="Norma Korrigjimit" value={`${correctionRate}%`} accent={parseFloat(correctionRate)>10?"var(--red)":"var(--green)"} icon="⚠️" />
      </div>

      {/* Cash/Card bar */}
      <div className="glass-card" style={{ borderRadius:10, padding:"16px 18px", marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, flexWrap:"wrap", gap:8 }}>
          <span style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.12em", textTransform:"uppercase" }}>Ndarja e Pagesave Sot</span>
          <div style={{ display:"flex", gap:14 }}>
            <span style={{ fontSize:11, color:"var(--green)" }}>💵 <span className="font-mono">{fmt(cashRev)}</span></span>
            <span style={{ fontSize:11, color:"var(--blue)"  }}>💳 <span className="font-mono">{fmt(cardRev)}</span></span>
          </div>
        </div>
        <div style={{ height:8, borderRadius:4, background:"var(--ink-5)", overflow:"hidden", display:"flex" }}>
          <div style={{ width:`${cashPct}%`, background:"var(--green)", transition:"width 0.4s ease" }} />
          <div style={{ width:`${cardPct}%`, background:"var(--blue)",  transition:"width 0.4s ease" }} />
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
          <span style={{ fontSize:10, color:"var(--green)" }}>{cashPct.toFixed(0)}% kesh</span>
          <span style={{ fontSize:10, color:"var(--blue)"  }}>{cardPct.toFixed(0)}% kartë</span>
        </div>
      </div>

      <div className="two-col">
        {/* Staff today */}
        <div className="glass-card" style={{ borderRadius:10, padding:"18px" }}>
          <h3 style={{ fontSize:11, letterSpacing:"0.1em", color:"var(--text-2)", marginBottom:14, textTransform:"uppercase" }}>Stafi Sot</h3>
          {workerBreakdown.map((w) => (
            <div key={w.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,var(--ink-4),var(--ink-5))", border:"1px solid var(--muted-2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"var(--gold)" }}>{w.name[0]}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"var(--text)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{w.name}</div>
                <div style={{ fontSize:10, color:"var(--text-3)" }}>{w.count} shërbime</div>
                <div style={{ marginTop:3, height:3, borderRadius:2, background:"var(--ink-5)", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${Math.min(100,(w.revenue/200)*100)}%`, background:"linear-gradient(90deg,var(--gold-dim),var(--gold))", borderRadius:2 }} />
                </div>
              </div>
              <span className="font-mono" style={{ color:"var(--gold)", fontSize:13, flexShrink:0 }}>{fmt(w.revenue)}</span>
            </div>
          ))}
          {workerBreakdown.length === 0 && <div style={{ color:"var(--text-3)", fontSize:12 }}>Nuk ka aktivitet sot</div>}
        </div>

        {/* Red flags */}
        <div className="glass-card" style={{ borderRadius:10, padding:"18px", border:"1px solid rgba(224,85,85,0.2)" }}>
          <h3 style={{ fontSize:11, letterSpacing:"0.1em", color:"var(--red)", marginBottom:14, textTransform:"uppercase", display:"flex", alignItems:"center", gap:5 }}>⚑ Sinjale të Kuqe</h3>
          {flags.length === 0 ? (
            <div style={{ color:"var(--green)", fontSize:12, display:"flex", alignItems:"center", gap:6 }}>✓ Nuk u zbuluan anomali</div>
          ) : flags.map((f,i) => (
            <div key={i} style={{ background:"rgba(224,85,85,0.08)", border:"1px solid rgba(224,85,85,0.2)", borderRadius:7, padding:"10px 12px", marginBottom:8 }}>
              <div style={{ color:"var(--red)", fontSize:11, fontWeight:600, marginBottom:2 }}>{f.type==="late-correction" ? "Korrigjim i Vonuar" : "Normë e Lartë Korrigjimi"}</div>
              <div style={{ color:"var(--text-3)", fontSize:11 }}>{f.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── OWNER: ALL TRANSACTIONS ──────────────────────────────────────────────────
function OwnerTransactions({ transactions, setTransactions, corrections, setCorrections, getWorker }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm,  setEditForm]  = useState({ service_id:"", payment_method:"cash", reason:"" });
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 700);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sorted = [...transactions].sort((a,b) => new Date(b.timestamp)-new Date(a.timestamp));

  const startEdit = (tx) => { setEditingId(tx.id); setEditForm({ service_id:tx.service_id, payment_method:tx.payment_method??"cash", reason:"" }); };
  const cancelEdit = () => setEditingId(null);
  const saveEdit  = (tx) => {
    if (!editForm.reason.trim()) return;
    const newSvc = SERVICES.find((s) => s.id===editForm.service_id);
    setCorrections((prev) => [...prev, {
      id:uid(), transaction_id:tx.id,
      original_data:{ service_id:tx.service_id, total_price:tx.total_price, payment_method:tx.payment_method },
      modified_data: { service_id:editForm.service_id, total_price:newSvc.price, payment_method:editForm.payment_method },
      owner_id:"w1", reason:editForm.reason, timestamp:new Date().toISOString(),
    }]);
    setTransactions((prev) => prev.map((t) => t.id===tx.id
      ? { ...t, service_id:editForm.service_id, total_price:newSvc.price, payment_method:editForm.payment_method }
      : t
    ));
    setEditingId(null);
  };

  // inline edit panel JSX — NOT a sub-component so it never remounts on keystroke
  const renderEditPanel = (tx) => (
    <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"14px", background:"var(--ink-4)", borderRadius:10, marginTop:10 }}>
      <div>
        <div style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>Ndrysho Shërbimin</div>
        <select value={editForm.service_id} onChange={(e) => setEditForm((f) => ({ ...f, service_id:e.target.value }))}
          style={{ width:"100%", background:"var(--ink-3)", border:"1px solid var(--gold-dim)", color:"var(--text)", borderRadius:7, padding:"8px 10px", fontSize:16, fontFamily:"'Syne',sans-serif" }}>
          {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.service_name} — {fmt(s.price)}</option>)}
        </select>
      </div>
      <div>
        <div style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>Mënyra e Pagesës</div>
        <div style={{ display:"flex", gap:8 }}>
          {["cash","card"].map((pm) => (
            <button key={pm} onClick={() => setEditForm((f) => ({ ...f, payment_method:pm }))} style={{
              flex:1, padding:"8px", borderRadius:7,
              background: editForm.payment_method===pm ? (pm==="cash" ? "rgba(76,175,122,0.2)" : "rgba(91,143,232,0.2)") : "var(--ink-5)",
              border:`1px solid ${editForm.payment_method===pm ? (pm==="cash" ? "var(--green)" : "var(--blue)") : "var(--ink-5)"}`,
              color: pm==="cash" ? "var(--green)" : "var(--blue)",
              fontSize:14, cursor:"pointer", fontFamily:"'Syne',sans-serif", fontWeight:600,
              touchAction:"manipulation",
            }}>
              {pm==="cash" ? "💵 Kesh" : "💳 Kartë"}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>Arsyeja <span style={{ color:"var(--red)" }}>*</span></div>
        <input
          placeholder="Pse po e korrigjon..."
          value={editForm.reason}
          onChange={(e) => setEditForm((f) => ({ ...f, reason:e.target.value }))}
          style={{ width:"100%", background:"var(--ink-3)", border:"1px solid var(--gold-dim)", color:"var(--text)", borderRadius:7, padding:"8px 10px", fontSize:16, fontFamily:"'Syne',sans-serif" }}
        />
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={() => saveEdit(tx)} disabled={!editForm.reason.trim()} style={{
          flex:1, background: editForm.reason.trim() ? "var(--green)" : "var(--ink-5)",
          border:"none", borderRadius:7, color: editForm.reason.trim() ? "var(--ink)" : "var(--muted)",
          padding:"10px", fontSize:14, fontWeight:700, cursor: editForm.reason.trim() ? "pointer" : "not-allowed",
          fontFamily:"'Syne',sans-serif", touchAction:"manipulation",
        }}>✓ Ruaj</button>
        <button onClick={cancelEdit} style={{
          flex:1, background:"var(--ink-5)", border:"none", borderRadius:7, color:"var(--text-2)",
          padding:"10px", fontSize:14, cursor:"pointer", fontFamily:"'Syne',sans-serif", touchAction:"manipulation",
        }}>✕ Anulo</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 16px" }}>
      <div style={{ marginBottom:20 }}>
        <h2 className="font-display" style={{ fontSize:26, fontWeight:600 }}>Të Gjitha Transaksionet</h2>
        <p style={{ color:"var(--text-3)", fontSize:12, marginTop:4 }}>Korrigjimet gjenerojnë automatikisht hyrje auditimi</p>
      </div>

      {sorted.length === 0 && (
        <div className="glass-card" style={{ borderRadius:10, padding:"40px", textAlign:"center", color:"var(--text-3)" }}>
          Ende nuk ka transaksione sot
        </div>
      )}

      {/* ── MOBILE: card list ── */}
      {isMobile && sorted.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {sorted.map((tx) => {
            const worker       = getWorker(tx.worker_id);
            const svc          = getService(tx.service_id);
            const isEditing    = editingId===tx.id;
            const hasCorrected = corrections.some((c) => c.transaction_id===tx.id);
            return (
              <div key={tx.id} className="glass-card fade-up" style={{
                borderRadius:12, padding:"16px",
                borderLeft: hasCorrected ? "3px solid var(--red)" : "3px solid rgba(201,168,76,0.2)",
              }}>
                {/* Row 1: worker + time + edit btn */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold-dim),var(--gold))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"var(--ink)", flexShrink:0 }}>
                      {worker?.name?.[0]}
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{worker?.name}</div>
                      <div className="font-mono" style={{ fontSize:10, color:"var(--text-3)" }}>{fmtTime(tx.timestamp)} · {fmtDate(tx.timestamp)}</div>
                    </div>
                  </div>
                  <button onClick={() => isEditing ? cancelEdit() : startEdit(tx)} style={{
                    background: isEditing ? "var(--ink-5)" : "rgba(201,168,76,0.1)",
                    border:`1px solid ${isEditing ? "var(--ink-5)" : "var(--gold-dim)"}`,
                    borderRadius:8, color: isEditing ? "var(--text-3)" : "var(--gold)",
                    padding:"6px 12px", fontSize:12, cursor:"pointer",
                    fontFamily:"'Syne',sans-serif", touchAction:"manipulation",
                  }}>
                    {isEditing ? "✕" : "✏ Ndrysho"}
                  </button>
                </div>

                {/* Row 2: service + price + payment + status */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, color:"var(--text)", fontWeight:500, marginBottom:4 }}>{svc?.service_name ?? "—"}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                      <span className="font-mono" style={{ color:"var(--gold)", fontSize:15, fontWeight:700 }}>{fmt(tx.total_price)}</span>
                      <PayBadge method={tx.payment_method} />
                      {hasCorrected && <span style={{ fontSize:10, color:"var(--red)", fontFamily:"'Syne Mono',monospace" }}>✏ Korrigjuar</span>}
                      <span className="badge-locked">🔒</span>
                    </div>
                  </div>
                </div>

                {/* Edit panel expands inline */}
                {isEditing && renderEditPanel(tx)}
              </div>
            );
          })}
        </div>
      )}

      {/* ── DESKTOP: table ── */}
      {!isMobile && sorted.length > 0 && (
        <div style={{ borderRadius:10, border:"1px solid rgba(201,168,76,0.12)", overflow:"hidden" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"var(--ink-3)", borderBottom:"1px solid rgba(201,168,76,0.2)" }}>
                {["Punonjësi","Shërbimi","Çmimi","Pagesa","Ora","Statusi","Veprim"].map((h) => (
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:9, letterSpacing:"0.12em", color:"var(--text-3)", textTransform:"uppercase", fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((tx,i) => {
                const worker       = getWorker(tx.worker_id);
                const svc          = getService(tx.service_id);
                const isEditing    = editingId===tx.id;
                const hasCorrected = corrections.some((c) => c.transaction_id===tx.id);
                return (
                  <React.Fragment key={tx.id}>
                    <tr className="tr-hover" style={{ background: i%2===0 ? "var(--ink-2)" : "var(--ink-3)", borderBottom: isEditing ? "none" : "1px solid rgba(255,255,255,0.03)", borderLeft: hasCorrected ? "3px solid var(--red)" : "3px solid transparent" }}>
                      <td style={{ padding:"12px 14px" }}><div style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>{worker?.name?.split(" ")[0]}</div></td>
                      <td style={{ padding:"12px 14px", fontSize:13, color:"var(--text)" }}>{svc?.service_name}</td>
                      <td style={{ padding:"12px 14px" }}><span className="font-mono" style={{ color:"var(--gold)", fontSize:14 }}>{fmt(tx.total_price)}</span></td>
                      <td style={{ padding:"12px 14px" }}><PayBadge method={tx.payment_method} /></td>
                      <td style={{ padding:"12px 14px" }}>
                        <div className="font-mono" style={{ fontSize:11, color:"var(--text-2)" }}>{fmtTime(tx.timestamp)}</div>
                        <div style={{ fontSize:9, color:"var(--text-3)" }}>{fmtDate(tx.timestamp)}</div>
                      </td>
                      <td style={{ padding:"12px 14px" }}>
                        {hasCorrected && <div style={{ fontSize:9, color:"var(--red)", marginBottom:3 }}>✏ Korrigjuar</div>}
                        <span className="badge-locked">🔒 BLLOKUAR</span>
                      </td>
                      <td style={{ padding:"12px 14px" }}>
                        <button onClick={() => isEditing ? cancelEdit() : startEdit(tx)} style={{
                          background: isEditing ? "var(--ink-5)" : "rgba(201,168,76,0.08)",
                          border:`1px solid ${isEditing ? "var(--ink-5)" : "var(--gold-dim)"}`,
                          borderRadius:6, color: isEditing ? "var(--text-3)" : "var(--gold)",
                          padding:"5px 12px", fontSize:11, cursor:"pointer", fontFamily:"'Syne',sans-serif",
                        }}>
                          {isEditing ? "✕ Anulo" : "✏ Ndrysho"}
                        </button>
                      </td>
                    </tr>
                    {isEditing && (
                      <tr style={{ background: i%2===0 ? "var(--ink-2)" : "var(--ink-3)", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                          <td colSpan={7} style={{ padding:"0 14px 14px" }}>
                          {renderEditPanel(tx)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── OWNER: CORRECTIONS LOG ───────────────────────────────────────────────────
function OwnerCorrections({ corrections, transactions, getWorker }) {
  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <h2 className="font-display" style={{ fontSize:26, fontWeight:600 }}>Regjistri i Korrigjimeve</h2>
          <span style={{ background:"rgba(224,85,85,0.15)", border:"1px solid var(--red)", color:"var(--red)", borderRadius:5, padding:"3px 10px", fontSize:11, fontFamily:"'Syne Mono',monospace" }}>{corrections.length} hyrje</span>
        </div>
        <p style={{ color:"var(--text-3)", fontSize:12, marginTop:4 }}>Çdo korrigjim regjistrohet këtu në mënyrë të pandryshueshme.</p>
      </div>
      {corrections.length === 0 ? (
        <div className="glass-card" style={{ borderRadius:10, padding:"40px", textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:12 }}>✓</div>
          <div style={{ color:"var(--green)", fontWeight:600 }}>Nuk ka korrigjime</div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[...corrections].reverse().map((c) => {
            const tx      = transactions.find((t) => t.id===c.transaction_id);
            const owner   = getWorker(c.owner_id);
            const worker  = tx ? getWorker(tx.worker_id) : null;
            const origSvc = getService(c.original_data.service_id);
            const newSvc  = getService(c.modified_data.service_id);
            return (
              <div key={c.id} className="glass-card fade-up" style={{ borderRadius:10, padding:"18px", borderLeft:"3px solid var(--red)" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:12 }}>
                  <div>
                    <div style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em", marginBottom:5, textTransform:"uppercase" }}>Para</div>
                    <div style={{ fontSize:12, color:"var(--red)" }}>{origSvc?.service_name ?? "—"}</div>
                    <div className="font-mono" style={{ fontSize:13, color:"var(--red)" }}>{fmt(c.original_data.total_price)}</div>
                    <div style={{ marginTop:4 }}><PayBadge method={c.original_data.payment_method} /></div>
                  </div>
                  <div>
                    <div style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em", marginBottom:5, textTransform:"uppercase" }}>Pas</div>
                    <div style={{ fontSize:12, color:"var(--green)" }}>{newSvc?.service_name ?? "—"}</div>
                    <div className="font-mono" style={{ fontSize:13, color:"var(--green)" }}>{fmt(c.modified_data.total_price)}</div>
                    <div style={{ marginTop:4 }}><PayBadge method={c.modified_data.payment_method} /></div>
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:8 }}>
                  <div>
                    <div style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:2 }}>Punonjësi</div>
                    <div style={{ fontSize:12, color:"var(--text)" }}>{worker?.name ?? "—"}</div>
                    <div style={{ fontSize:10, color:"var(--text-3)" }}>{tx ? `${fmtTime(tx.timestamp)} · ${fmtDate(tx.timestamp)}` : "—"}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:2 }}>Korrigjuar Nga</div>
                    <div style={{ fontSize:12, color:"var(--gold)" }}>{owner?.name}</div>
                    <div className="font-mono" style={{ fontSize:9, color:"var(--text-3)" }}>{fmtTime(c.timestamp)}</div>
                  </div>
                </div>
                <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize:9, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase" }}>Arsyeja: </span>
                  <span style={{ fontSize:12, color:"var(--text-2)", fontStyle:"italic" }}>{c.reason}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── OWNER: ARCHIVE ───────────────────────────────────────────────────────────
function OwnerArchive({ archivedTransactions, getWorker }) {
  const [openMonths, setOpenMonths] = useState({});
  const [searchWorker, setSearchWorker] = useState("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const filtered = searchWorker==="all" ? archivedTransactions : archivedTransactions.filter((t) => t.worker_id===searchWorker);
  const grouped  = {};
  [...filtered].sort((a,b) => new Date(b.timestamp)-new Date(a.timestamp)).forEach((tx) => {
    const key = monthKey(tx.timestamp);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(tx);
  });
  const monthKeys = Object.keys(grouped).sort((a,b) => b.localeCompare(a));
  const toggleMonth = (key) => setOpenMonths((prev) => ({ ...prev, [key]:!prev[key] }));

  const totalArchived = filtered.reduce((s,t) => s+t.total_price, 0);
  const cashArchived  = filtered.filter((t) => t.payment_method==="cash").reduce((s,t) => s+t.total_price, 0);
  const cardArchived  = filtered.filter((t) => t.payment_method==="card").reduce((s,t) => s+t.total_price, 0);
  const workers = INITIAL_WORKERS.filter((w) => w.role==="Worker");

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>
      <div style={{ marginBottom:22 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", marginBottom:6 }}>
          <span style={{ fontSize:26 }}>📦</span>
          <h2 className="font-display" style={{ fontSize:26, fontWeight:600 }}>Arkiva e Transaksioneve</h2>
          <span style={{ background:"rgba(155,114,232,0.15)", border:"1px solid rgba(155,114,232,0.4)", color:"var(--purple)", borderRadius:5, padding:"3px 10px", fontSize:11, fontFamily:"'Syne Mono',monospace" }}>{filtered.length} regjistrime</span>
        </div>
        <p style={{ color:"var(--text-3)", fontSize:12 }}>
          Rivendosur automatikisht çdo natë në ora <strong style={{ color:"var(--gold)" }}>23:00</strong>. Organizuar sipas muajit.
        </p>
      </div>

      <div className="stats-grid-4" style={{ marginBottom:20 }}>
        <StatCard label="Totali Arkivë"  value={fmt(totalArchived)} accent="var(--purple)" icon="📦" />
        <StatCard label="Transaksione"   value={filtered.length} sub="gjithë kohën" accent="var(--text-2)" icon="📋" />
        <StatCard label="Kesh"           value={fmt(cashArchived)} accent="var(--green)" icon="💵" />
        <StatCard label="Kartë"          value={fmt(cardArchived)} accent="var(--blue)"  icon="💳" />
      </div>

      {/* Worker filter */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, overflowX:"auto", paddingBottom:4 }}>
        <span style={{ fontSize:10, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase", flexShrink:0 }}>Filtro:</span>
        {[{ id:"all", name:"Të Gjithë" }, ...workers].map((w) => (
          <button key={w.id} onClick={() => setSearchWorker(w.id)} style={{
            background: searchWorker===w.id ? "rgba(201,168,76,0.12)" : "var(--ink-4)",
            border:`1px solid ${searchWorker===w.id ? "var(--gold-dim)" : "var(--ink-5)"}`,
            color: searchWorker===w.id ? "var(--gold)" : "var(--text-2)",
            borderRadius:6, padding:"5px 12px", fontSize:12, cursor:"pointer",
            fontFamily:"'Syne',sans-serif", fontWeight:600, flexShrink:0,
            touchAction:"manipulation",
          }}>{w.name.split(" ")[0]}</button>
        ))}
      </div>

      {/* Month accordions */}
      {monthKeys.length === 0 ? (
        <div className="glass-card" style={{ borderRadius:10, padding:"40px", textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:12 }}>📭</div>
          <div style={{ color:"var(--text-3)", fontWeight:600 }}>Nuk ka të dhëna të arkivuara</div>
        </div>
      ) : monthKeys.map((key) => {
        const txs       = grouped[key];
        const isOpen    = openMonths[key] ?? true;
        const monthRev  = txs.reduce((s,t) => s+t.total_price, 0);
        const monthCash = txs.filter((t) => t.payment_method==="cash").reduce((s,t) => s+t.total_price, 0);
        const monthCard = txs.filter((t) => t.payment_method==="card").reduce((s,t) => s+t.total_price, 0);
        const label     = fmtMonth(txs[0].timestamp);
        return (
          <div key={key} style={{ marginBottom:12 }}>
            {/* Month header */}
            <div className="month-row" onClick={() => toggleMonth(key)} style={{
              background:"var(--ink-3)", border:"1px solid rgba(201,168,76,0.15)",
              borderRadius: isOpen ? "10px 10px 0 0" : 10,
              padding:"14px 16px", display:"flex", alignItems:"center", gap:12,
              cursor:"pointer", transition:"all 0.2s", touchAction:"manipulation",
            }}>
              <span style={{ color:"var(--gold)", fontSize:12, transition:"transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", display:"inline-block", flexShrink:0 }}>▶</span>
              <div style={{ flex:1, minWidth:0 }}>
                <span className="font-display" style={{ fontSize:17, fontWeight:600, color:"var(--text)", textTransform:"capitalize" }}>{label}</span>
                <span style={{ marginLeft:8, fontSize:10, color:"var(--text-3)" }}>{txs.length} tx</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2, flexShrink:0 }}>
                <span className="font-mono" style={{ color:"var(--gold)", fontSize:15, fontWeight:700 }}>{fmt(monthRev)}</span>
                <div style={{ display:"flex", gap:8 }}>
                  <span style={{ fontSize:10, color:"var(--green)" }}>💵{fmt(monthCash)}</span>
                  <span style={{ fontSize:10, color:"var(--blue)"  }}>💳{fmt(monthCard)}</span>
                </div>
              </div>
              {!isMobile && <span className="badge-archive" style={{ flexShrink:0 }}>ARKIVË</span>}
            </div>

            {isOpen && (
              <div className="slide-down" style={{ border:"1px solid rgba(201,168,76,0.12)", borderTop:"none", borderRadius:"0 0 10px 10px", overflow:"hidden" }}>
                {isMobile ? (
                  /* ── MOBILE: card list ── */
                  <div>
                    {txs.map((tx, i) => {
                      const worker = getWorker(tx.worker_id);
                      const svc    = getService(tx.service_id);
                      return (
                        <div key={tx.id} style={{
                          display:"grid", gridTemplateColumns:"1fr auto",
                          gap:"4px 12px", padding:"12px 14px",
                          background: i%2===0 ? "var(--ink-2)" : "var(--ink-3)",
                          borderBottom:"1px solid rgba(255,255,255,0.04)",
                        }}>
                          {/* Left col */}
                          <div>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                              <span style={{ fontSize:12, fontWeight:700, color:"var(--text)" }}>{worker?.name?.split(" ")[0] ?? "—"}</span>
                              <span className="font-mono" style={{ fontSize:10, color:"var(--text-3)" }}>{fmtTime(tx.timestamp)}</span>
                            </div>
                            <div style={{ fontSize:11, color:"var(--text-2)", marginBottom:4, lineHeight:1.4 }}>{svc?.service_name ?? "—"}</div>
                            <div style={{ fontSize:9, color:"var(--text-3)" }}>{fmtDate(tx.timestamp)}</div>
                          </div>
                          {/* Right col */}
                          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, justifyContent:"center" }}>
                            <span className="font-mono" style={{ color:"var(--gold)", fontSize:14, fontWeight:700 }}>{fmt(tx.total_price)}</span>
                            <PayBadge method={tx.payment_method} />
                          </div>
                        </div>
                      );
                    })}
                    {/* Mobile footer */}
                    <div style={{ background:"var(--ink-4)", borderTop:"1px solid rgba(201,168,76,0.15)", padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:10, color:"var(--text-3)", letterSpacing:"0.08em" }}>TOTAL {label.toUpperCase()}</span>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontSize:10, color:"var(--green)" }}>💵{fmt(monthCash)}</span>
                        <span style={{ fontSize:10, color:"var(--blue)" }}>💳{fmt(monthCard)}</span>
                        <span className="font-mono" style={{ color:"var(--gold)", fontSize:13, fontWeight:700 }}>{fmt(monthRev)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── DESKTOP: table ── */
                  <div style={{ overflowX:"auto" }}>
                    <table style={{ width:"100%", borderCollapse:"collapse", minWidth:480 }}>
                      <thead>
                        <tr style={{ background:"var(--ink-4)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                          {["Data & Ora","Punonjësi","Shërbimi","Çmimi","Pagesa"].map((h) => (
                            <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontSize:9, letterSpacing:"0.12em", color:"var(--text-3)", textTransform:"uppercase", fontWeight:600 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {txs.map((tx,i) => {
                          const worker = getWorker(tx.worker_id);
                          const svc    = getService(tx.service_id);
                          return (
                            <tr key={tx.id} className="tr-hover" style={{ background: i%2===0 ? "var(--ink-2)" : "var(--ink-3)", borderBottom:"1px solid rgba(255,255,255,0.02)" }}>
                              <td style={{ padding:"10px 14px" }}>
                                <div className="font-mono" style={{ fontSize:11, color:"var(--text-2)" }}>{fmtTime(tx.timestamp)}</div>
                                <div style={{ fontSize:9, color:"var(--text-3)", marginTop:1 }}>{fmtDate(tx.timestamp)}</div>
                              </td>
                              <td style={{ padding:"10px 14px", fontSize:12, color:"var(--text)", fontWeight:500 }}>{worker?.name?.split(" ")[0] ?? "—"}</td>
                              <td style={{ padding:"10px 14px", fontSize:11, color:"var(--text-2)" }}>{svc?.service_name ?? "—"}</td>
                              <td style={{ padding:"10px 14px" }}><span className="font-mono" style={{ color:"var(--gold)", fontSize:12 }}>{fmt(tx.total_price)}</span></td>
                              <td style={{ padding:"10px 14px" }}><PayBadge method={tx.payment_method} /></td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr style={{ background:"var(--ink-4)", borderTop:"1px solid rgba(201,168,76,0.15)" }}>
                          <td colSpan={3} style={{ padding:"9px 14px", fontSize:10, color:"var(--text-3)", letterSpacing:"0.08em" }}>TOTALI PËR {label.toUpperCase()}</td>
                          <td style={{ padding:"9px 14px" }}><span className="font-mono" style={{ color:"var(--gold)", fontSize:13, fontWeight:700 }}>{fmt(monthRev)}</span></td>
                          <td style={{ padding:"9px 14px" }}>
                            <span style={{ fontSize:10, color:"var(--green)" }}>💵{fmt(monthCash)}</span>
                            <span style={{ fontSize:10, color:"var(--text-3)", margin:"0 5px" }}>·</span>
                            <span style={{ fontSize:10, color:"var(--blue)" }}>💳{fmt(monthCard)}</span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── OWNER: STAFF ─────────────────────────────────────────────────────────────
function OwnerStaff({ transactions, workers }) {
  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 16px" }}>
      <div style={{ marginBottom:20 }}>
        <h2 className="font-display" style={{ fontSize:26, fontWeight:600 }}>Pasqyra e Stafit</h2>
      </div>
      <div className="staff-grid">
        {workers.filter((w) => w.role==="Worker").map((w) => {
          const wTx    = transactions.filter((t) => t.worker_id===w.id);
          const wToday = wTx.filter((t) => new Date(t.timestamp).toDateString()===new Date().toDateString());
          const rev      = wTx.reduce((s,t) => s+t.total_price, 0);
          const revToday = wToday.reduce((s,t) => s+t.total_price, 0);
          const cashToday = wToday.filter((t) => t.payment_method==="cash").reduce((s,t) => s+t.total_price, 0);
          const cardToday = wToday.filter((t) => t.payment_method==="card").reduce((s,t) => s+t.total_price, 0);
          const timelog  = TIME_LOGS.find((tl) => tl.worker_id===w.id);
          const isClocked = timelog?.clock_in && !timelog?.clock_out;
          return (
            <div key={w.id} className="glass-card fade-up" style={{ borderRadius:12, padding:"20px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold-dim),var(--gold))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:700, color:"var(--ink)", flexShrink:0 }}>{w.name[0]}</div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:15, color:"var(--text)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{w.name}</div>
                  <div style={{ fontSize:11, color: isClocked ? "var(--green)" : "var(--text-3)", display:"flex", alignItems:"center", gap:4 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background: isClocked ? "var(--green)" : "var(--muted)", display:"inline-block", flexShrink:0 }} />
                    {isClocked ? `Hyrë në ${fmtTime(timelog.clock_in)}` : "Nuk është kyçur"}
                  </div>
                </div>
              </div>
              <div className="gold-line" style={{ marginBottom:14 }} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div>
                  <div style={{ fontSize:9, color:"var(--text-3)", marginBottom:3 }}>TË ARD. TOTALE</div>
                  <div className="font-mono" style={{ color:"var(--gold)", fontSize:15 }}>{fmt(rev)}</div>
                </div>
                <div>
                  <div style={{ fontSize:9, color:"var(--text-3)", marginBottom:3 }}>SOT</div>
                  <div className="font-mono" style={{ color:"var(--green)", fontSize:15 }}>{fmt(revToday)}</div>
                </div>
              </div>
              {wToday.length > 0 && (
                <div style={{ marginTop:12, paddingTop:10, borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:10 }}>
                  <span style={{ fontSize:11, color:"var(--green)" }}>💵 {fmt(cashToday)}</span>
                  <span style={{ fontSize:11, color:"var(--text-3)" }}>·</span>
                  <span style={{ fontSize:11, color:"var(--blue)"  }}>💳 {fmt(cardToday)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [workers]     = useState(INITIAL_WORKERS);
  const [user, setUser]  = useState(null);
  const [view, setView]  = useState(null);
  const [transactions, setTransactions]                   = useState(INITIAL_TRANSACTIONS);
  const [archivedTransactions, setArchivedTransactions]   = useState(INITIAL_ARCHIVED_TRANSACTIONS);
  const [corrections, setCorrections]                     = useState(INITIAL_CORRECTIONS);
  const [showResetToast, setShowResetToast]               = useState(false);
  const lastResetDateRef = useRef(null);

  // ── 11 PM daily reset ───────────────────────────────────────────────────────
  useEffect(() => {
    const checkReset = () => {
      const now      = new Date();
      const todayStr = now.toDateString();
      if (now.getHours()===23 && now.getMinutes()===0 && lastResetDateRef.current !== todayStr) {
        lastResetDateRef.current = todayStr;
        setTransactions((current) => {
          if (current.length > 0) {
            setArchivedTransactions((archive) => [...archive, ...current]);
            setShowResetToast(true);
          }
          return [];
        });
      }
    };
    const interval = setInterval(checkReset, 30_000);
    checkReset();
    return () => clearInterval(interval);
  }, []);

  const getWorker   = (id) => workers.find((w) => w.id===id);
  const handleLogin = (worker) => { setUser(worker); setView(worker.role==="Owner" ? "dashboard" : "log"); };
  const handleLogout = () => { setUser(null); setView(null); };

  if (!user) return (<><GlobalStyles /><PinLogin onLogin={handleLogin} workers={workers} /></>);

  const isOwner = user.role === "Owner";

  const renderView = () => {
    if (isOwner) {
      if (view==="dashboard")    return <OwnerDashboard    transactions={transactions} corrections={corrections} workers={workers} />;
      if (view==="transactions") return <OwnerTransactions transactions={transactions} setTransactions={setTransactions} corrections={corrections} setCorrections={setCorrections} getWorker={getWorker} />;
      if (view==="corrections")  return <OwnerCorrections  corrections={corrections} transactions={transactions} getWorker={getWorker} />;
      if (view==="archive")      return <OwnerArchive      archivedTransactions={archivedTransactions} getWorker={getWorker} />;
      if (view==="staff")        return <OwnerStaff        transactions={transactions} workers={workers} />;
    } else {
      if (view==="log")     return <WorkerLogService user={user} transactions={transactions} setTransactions={setTransactions} />;
      if (view==="history") return <WorkerHistory    user={user} transactions={transactions} />;
    }
    return null;
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ height:"100dvh", display:"flex", flexDirection:"column", background:"var(--ink)", overflow:"hidden" }}>
        <TopNav user={user} onLogout={handleLogout} view={view} setView={setView} />
        <div style={{ flex:1, minHeight:0, overflowY:"auto", overscrollBehavior:"contain", background:"var(--ink)" }}>
          {renderView()}
        </div>
        {/* Worker bottom nav */}
        {!isOwner && <WorkerBottomNav view={view} setView={setView} onLogout={handleLogout} />}
      </div>
      {showResetToast && <ResetToast onDismiss={() => setShowResetToast(false)} />}
    </>
  );
}