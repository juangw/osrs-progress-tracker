from osrs.controllers.highscores import Highscores
from osrs.enums import AccountType
from osrs.exceptions import OutdatedError
from unittest import mock

import unittest


class TestHighscores(unittest.TestCase):
    """Test highscores controller"""

    @mock.patch("osrs.controllers.highscores.Highscores._call_highscores_api")
    def test_fail_retrieve_highscores(
        self,
        highscores_api_results: mock.MagicMock(),
    ):
        """Test fails when gets incorrect number of rows from response"""
        # Given
        highscores_controller = Highscores(
            username="testerboi", account_type=AccountType.NORMAL
        )
        highscores_api_results.return_value = """
        24422,2277,331473717
        """

        # When/Then
        with self.assertRaises(OutdatedError):
            highscores_controller.set_user_highscores()

    @mock.patch("osrs.controllers.highscores.Highscores._call_highscores_api")
    def test_retrieve_highscores(
        self,
        highscores_api_results: mock.MagicMock(),
    ):
        """Test assigns correct number of values for each category"""
        # Given
        highscores_controller = Highscores(
            username="testerboi", account_type=AccountType.NORMAL
        )
        highscores_api_results.return_value = """
            2408,2277,1023774312
            24625,99,31422023
            4313,99,43242924
            1240,99,190315331
            1721,99,164232305
            4412,99,133883172
            3341,99,16040614
            2166,99,78729108
            143188,99,13378420
            23160,99,18819032
            58286,99,13456906
            23627,99,16671536
            19175,99,19155964
            49929,99,14079226
            11656,99,16552285
            29862,99,14985776
            40845,99,13270979
            7633,99,15766792
            53173,99,14232817
            2835,99,43054223
            2228,99,93720547
            5204,99,22739186
            18442,99,17993651
            1205,99,18031495
            -1,-1
            -1,-1
            30056,10
            14946,3
            147915,8
            102440,7
            353,9697
            1078,825
            159,6000
            2299,1606
            40217,311
            660,460
            1040,495
            8213,4120
            -1,-1
            10087,14780
            6045,1060
            4057,43487
            2994,2192
            19974,2066
            37524,143
            4084,1830
            225623,5
            39816,293
            82932,58
            11592,2487
            192202,34
            1544,684
            40697,128
            159656,26
            57417,287
            2727,2000
            157705,41
            22967,917
            29982,902
            22984,926
            83448,25
            4818,1320
            21158,1228
            72651,474
            791,3416
            9164,253
            2178,2046
            51052,580
            60793,2896
            5600,1403
            2407,1444
            1564,324
            592,44
            33303,626
            4132,749
            4423,500
            1121,217
            17321,379
            73067,119
            50668,91
            3893,1245
            386211,10
            1208,49
            2804,1569
            46534,273
            218754,7
            92638,201
            8346,666
            880,1783
            21878,310
            5271,192
            7865,3066
            114052,37
            177,1537
            7060,7
            134758,8
            3778,2113
            232,7096
            79934,51
            16587,2780
            936711,62
            180600,25
            238423,275
        """

        # When
        highscores_controller.set_user_highscores()

        # Then
        self.assertEqual(len(highscores_controller.bosses.to_json()), 61)
        self.assertEqual(len(highscores_controller.minigames.to_json()), 18)
        self.assertEqual(len(highscores_controller.skills.to_json()), 23)
